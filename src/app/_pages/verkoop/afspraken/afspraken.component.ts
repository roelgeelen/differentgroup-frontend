import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {GoogleMap, MapDirectionsService, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {Appointment} from "../../../_models/appointment/Appointment";
import {ApiService} from "../../../_services/api.service";
import {formatDate} from "@angular/common";
import {Calendar} from "../../../_models/calendar/Calendar";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {WeekRangeSelectionStrategy} from "../../../_helpers/weekRangeSelection.strategy";
import {DateAdapter, NativeDateAdapter} from "@angular/material/core";
import {CalendarDateFormatter, CalendarEvent} from "angular-calendar";
import {Observable, startWith, map, Subject, of} from 'rxjs';
import {startOfWeek, endOfWeek, addHours, subHours} from 'date-fns';
import {CustomDateAdapter, CustomDateFormatter} from "./custom-date-formatter.provider";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDialog} from "@angular/material/dialog";
import {EventInfoDialogComponent} from "./event-info-dialog/event-info-dialog.component";

const calendars: Calendar[] = [
  {
    name: 'Sil Kuppens',
    id: '238951387',
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    color: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    type: 'sectionaal',
    events: [],
    appointments: []
  },
  {
    name: 'Harm Verstappen',
    id: '260463341',
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    color: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    type: 'sectionaal',
    events: [],
    appointments: []
  },
  // {
  //   name: 'Sam Cummins',
  //   id: '289996526',
  //   color: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  // },
  {
    name: 'Patrick Smolders',
    id: '289992164',
    icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    color: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    },
    type: 'openslaande',
    events: [],
    appointments: []
  },
  {
    name: 'Danny Rutjes',
    id: '364617441',
    icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    color: {
      primary: '#691eff',
      secondary: '#e2d1ff'
    },
    type: 'openslaande',
    events: [],
    appointments: []
  }
];

@Component({
  selector: 'app-afspraken',
  templateUrl: './afspraken.component.html',
  styleUrls: ['./afspraken.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekRangeSelectionStrategy
    },
    {provide: DateAdapter, useClass: CustomDateAdapter},
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }

  ]
})
export class AfsprakenComponent implements OnInit {
  @ViewChild('calendarInput') calendarInput: ElementRef<HTMLInputElement>;
  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild('radiusCircle') circle: ElementRef;
  @ViewChildren('somemarker') components: QueryList<MapMarker>;
  @ViewChild(GoogleMap) map: GoogleMap
  @ViewChild(MapInfoWindow) info: MapInfoWindow
  loading = false;
  mode: ProgressSpinnerMode = 'determinate';
  zoom = 9
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    maxZoom: 15,
    minZoom: 6
  }
  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  markers: any[] = []
  radius: any[] = []
  infoContent = ''
  calendars: Calendar[] = calendars;
  owners: Calendar[] = [];
  address: string = '';
  loadingCals = false;
  distance: number = 25;
  start: Date = startOfWeek(new Date(), {weekStartsOn: 1});
  end: Date = endOfWeek(new Date(), {weekStartsOn: 1});
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  calendarCtrl = new FormControl('');
  filteredCalendars: Observable<Calendar[]>;


  formatLabel(value: number) {
    if (value >= 10) {
      return value + 'km';
    }
    return value;
  }

  constructor(@Inject(ApiService) private apiService: ApiService, public dialog: MatDialog, public mapDirectionsService: MapDirectionsService) {
    this.filteredCalendars = this.calendarCtrl.valueChanges.pipe(
      startWith(null),
      map((cal: string | null) => (cal ? this._filter(cal) : this.calendars.slice())),
    );
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  calculateRoute(apo: CalendarEvent) {
    const marker = this.components.find(m => m.getTitle() == apo.id);
    if (marker instanceof MapMarker) {
      const request: google.maps.DirectionsRequest = {
        destination: marker['_position'],
        origin: this.center,
        travelMode: google.maps.TravelMode.DRIVING,

      };
      this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => {
        this.openInfo(marker, response.result?.routes[0].legs[0].duration?.text);
        return response.result
      }));
    }
  }

  openDialog(event: CalendarEvent) {
    this.dialog.open(EventInfoDialogComponent, {
        data: event
      }
    );
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement,
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement,
    )
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places?.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.center.lat = bounds.getCenter().lat();
      this.center.lng = bounds.getCenter().lng();
      this.onSearch();
      this.map.fitBounds(bounds);
      this.searchField.nativeElement.focus();
    });

  }

  onInputChange(event: number | null) {
    if (event != null) {
      this.distance = event;
      this.owners.forEach(owner => {
        this.setEvents(owner);
      })
    }
  }

  setRadius() {
    this.radius = [];
    this.radius.push({
      center: this.center,
      radius: this.distance * 1000,
      options: {
        fillColor: 'green',
        fillOpacity: 0.15,
        strokeColor: 'darkgreen'
      }
    });

    this.zoom = 10;
  }

  openInfo(marker: MapMarker | undefined, content: any) {
    this.infoContent = content
    this.info.open(marker)
  }

  selectWeek() {
    this.viewDate = this.start;
    this.onSearch();
  }

  onSearch() {
    if (this.address === '' || this.owners.length === 0 || this.end === undefined) {
      return;
    }

    this.loading = true;
    this.markers = [];
    this.owners.forEach(owner => {
      this.apiService.searchNearbyEvents(this.center.lat, this.center.lng, [owner.id], this.distance, this.start.toISOString(), this.end.toISOString()).subscribe(apos => {
        owner.appointments = apos;
        this.setEvents(owner);
        this.directionsResults$ = of(undefined);
        owner.appointments.forEach(apo => {
          // @ts-ignore
          const pointer: Calendar = calendars.find(({name}) => name === apo.organizer.emailAddress.name.split(' | ')[0]);
          if (pointer != undefined && apo.location.coordinates) {
            this.markers.push({
              position: {
                lat: +apo.location.coordinates.latitude,
                lng: +apo.location.coordinates.longitude,
              },
              label: {
                color: 'black',
                text: apo.subject,
              },
              title: apo.location.displayName,
              info: formatDate(apo.start.dateTime + 'Z', 'EEEE, dd MMMM, HH:mm', 'nl-NL'),
              options: {
                icon: pointer.icon,
                animation: google.maps.Animation.DROP,
              },
            })
          }
        });

        setTimeout(() => {
          this.searchField.nativeElement.blur();
        }, 0);
        this.loading = false;
      }, error => {
        this.loading = false;
      })
    })
  }

  setEvents(owner: Calendar) {
    owner.events = [];
    const newEvents: CalendarEvent[] = [];

    owner.appointments.forEach(apo => {
      // @ts-ignore
      const pointer: Calendar = calendars.find(({name}) => name === apo.organizer.emailAddress.name.split(' | ')[0]);
      if (pointer != undefined) {
        const duration = (new Date(apo.end.dateTime).getTime() - new Date(apo.start.dateTime).getTime());
        newEvents.push({
          id: apo.location.displayName,
          title: apo.subject + '<br><small>' + apo.location.displayName.split(';')[0] + '</small>',
          color: pointer.color,
          cssClass: apo.distance < this.distance ? 'nearby' : '',
          start: addHours(new Date(apo.start.dateTime), new Date(apo.start.dateTime).getTimezoneOffset() / -60),
          end: duration > 86300000 ? subHours(new Date(apo.end.dateTime), 1) :addHours(new Date(apo.end.dateTime), new Date(apo.end.dateTime).getTimezoneOffset() / -60),
          allDay: duration > 86300000,
          actions: apo.distance < 500 ? [
            {
              label: '<img src="'+pointer.icon+'">',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.calculateRoute(event);
              }
            }
          ] : [],
          meta: apo.body.content
        })
      }
    })
    owner.events = newEvents;
    // @ts-ignore
    this.refresh.next();
    this.setRadius();
  }

  selectPoint(apo: CalendarEvent) {

  }

  setSelectedWeek() {
    this.start = startOfWeek(this.viewDate, {weekStartsOn: 1});
    this.end = endOfWeek(this.viewDate, {weekStartsOn: 1});
    this.onSearch();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const cals = this.calendars.filter(owner => owner.name.includes(value))[0];
      if (cals != undefined && this.owners.filter(owner => owner.name.includes(value)).length == 0 && this.owners.length < 3) {
        this.owners.push(cals);
        this.onSearch();
      }
    }
    // Clear the input value
    event.chipInput!.clear();
    this.calendarCtrl.setValue(null);
  }

  remove(owner: string): void {
    const index = this.owners.map(object => object.id).indexOf(owner);

    if (index >= 0) {
      this.owners.splice(index, 1);
      this.onSearch();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // @ts-ignore
    if (this.owners.filter(owner => owner.name.includes(event.option.viewValue)).length == 0 && this.owners.length < 3) {
      this.owners.push(this.calendars.filter(owner => owner.name.includes(event.option.viewValue))[0]);
      this.onSearch();
    }
    this.calendarInput.nativeElement.value = '';
    this.calendarCtrl.setValue(null);
  }

  private _filter(value: string): Calendar[] {
    return  this.calendars.filter(owner => owner.name.includes(value));
  }

  filterCals(type: string) {
    this.owners = this.calendars.filter(q => q.type === type);
    this.onSearch();
  }
}
