import {Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoogleMap, MapDirectionsService, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {ApiService} from "../../../_services/api.service";
import {formatDate} from "@angular/common";
import {Calendar} from "../../../_models/calendar/Calendar";
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from "@angular/material/datepicker";
import {WeekRangeSelectionStrategy} from "../../../_helpers/weekRangeSelection.strategy";
import {DateAdapter} from "@angular/material/core";
import {CalendarDateFormatter, CalendarEvent} from "angular-calendar";
import {map, Observable, of, startWith, Subject} from 'rxjs';
import {addHours, endOfWeek, startOfWeek, subHours} from 'date-fns';
import {CustomDateAdapter, CustomDateFormatter} from "./custom-date-formatter.provider";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDialog} from "@angular/material/dialog";
import {EventInfoDialogComponent} from "./event-info-dialog/event-info-dialog.component";
import {Appointment} from "../../../_models/appointment/Appointment";
import {Location} from "../../../_models/appointment/Location";

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
    name: 'Wessel van den houdt',
    id: '1405005535',
    icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    color: {
      primary: '#691eff',
      secondary: '#e2d1ff'
    },
    type: 'openslaande',
    events: [],
    appointments: []
  },
  {
    name: 'Mark Bogers',
    id: '522705647',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    color: {
      primary: '#5eff1e',
      secondary: '#ddffd1'
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
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  interval: any;
  markers: any[] = []
  vehicles: any[] = []
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
    });
    this.getTrackingVehicles();
    this.interval = setInterval(() => {
      this.getTrackingVehicles();
    }, 60000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
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
      this.owners.forEach(owner => {
        this.setEvents(owner);
      })
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
    if (this.owners.length === 0 || this.end === undefined) {
      return;
    }
    this.loading = true;
    this.markers = [];
    this.directionsResults$ = of(undefined);

    // Loop calendars
    this.owners.forEach(owner => {
      //Get events
      this.apiService.getCalendar(owner.id, this.start.toISOString(), this.end.toISOString()).subscribe(apos => {
        owner.appointments = apos;
        this.setEvents(owner);

        // Set map points
        owner.appointments.forEach(apo => {
          if (apo.location.coordinates) {
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
                icon: owner.icon,
                animation: google.maps.Animation.DROP,
              },
            })
          }
        });

        this.loading = false;
      }, error => {
        this.loading = false;
      })
    })
  }

  getTrackingVehicles() {
    this.vehicles = [];
    this.apiService.getTracking("2096391f65c25addbe6c2a5a8170353c").subscribe(vehicles => {
      vehicles.forEach(v => {
        if (v.location) {
          this.vehicles.push({
            position: {
              lat: +v.location.latitude,
              lng: +v.location.longitude,
            },
            options: {
              icon: {
                url: this.encodeSVG(this.generateCarMarker(v.alias, v.location.course, v.location.in_movement)),
                anchor: new google.maps.Point(25, 15),
              }
            },
          })
        }
      })
    });
  }

  setEvents(owner: Calendar) {
    owner.events = [];
    const newEvents: CalendarEvent[] = [];

    owner.appointments.forEach(apo => {
      if (apo.location.coordinates) {
        apo.distance = this.getDistanceFromLatLonInKm(this.center.lat, this.center.lng, +apo.location.coordinates.latitude, +apo.location.coordinates.longitude);
      }
      const duration = (new Date(apo.end.dateTime).getTime() - new Date(apo.start.dateTime).getTime());
      newEvents.push({
        id: apo.location.displayName,
        title: apo.subject + '<br><small>' + apo.location.displayName.split(';')[0] + '</small>',
        color: owner.color,
        cssClass: apo.distance < this.distance ? 'nearby' : '',
        start: addHours(new Date(apo.start.dateTime), new Date(apo.start.dateTime).getTimezoneOffset() / -60),
        end: duration > 86300000 ? subHours(new Date(apo.end.dateTime), 1) : addHours(new Date(apo.end.dateTime), new Date(apo.end.dateTime).getTimezoneOffset() / -60),
        allDay: duration > 86300000,
        actions: apo.distance < 500 ? [
          {
            label: '<img src="' + owner.icon + '">',
            onClick: ({event}: { event: CalendarEvent }): void => {
              this.calculateRoute(event);
            }
          }
        ] : [],
        meta: apo.body.content
      })

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
    return this.calendars.filter(owner => owner.name.includes(value));
  }

  filterCals(type: string) {
    this.owners = this.calendars.filter(q => q.type === type);
    this.onSearch();
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist * 1.609344;
    }
  }

  generateCarMarker(name: string, rotation: number, in_movement: boolean) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="45"  viewBox="40 0 71 45" fill="none">
      <style type="text/css">
        .car{transform:rotate(${rotation}deg);transform-box: fill-box;transform-origin: center;}
        .st0{fill:#EDEDED;stroke:#000000;stroke-width:0.7;stroke-miterlimit:10;}
        .st1{fill:#F6F6F6;stroke:#000000;stroke-width:0.7;stroke-miterlimit:10;}
        .st2{fill:${in_movement ? '#06b085' : '#d3d3d3'};stroke:#000000;stroke-width:0.7;stroke-miterlimit:10;}
      </style>
      <g class="car">
      <path class="st0" d="M17.13,12.24c0,0.2,0,0.37,0,0.53c0,4.92-0.02,9.83,0.01,14.75c0.01,1.4-0.62,2.31-1.79,2.95
        c-1.5,0.81-3.13,1.1-4.81,1.17c-1.92,0.08-3.82-0.1-5.61-0.86c-0.98-0.42-1.89-0.96-2.26-2.06c-0.09-0.28-0.14-0.58-0.14-0.87
        C2.53,22.83,2.53,17.82,2.53,12.8c0-0.18,0-0.36,0-0.59c-0.59,0.09-1.13,0.15-1.65,0.26c-0.33,0.07-0.46-0.02-0.51-0.36
        c-0.09-0.68,0.06-0.96,0.71-1.21c0.28-0.11,0.55-0.26,0.84-0.31c0.54-0.09,0.64-0.39,0.62-0.89c-0.04-1.11,0-2.22-0.01-3.33
        C2.51,3.94,3.66,2.24,5.81,1.26C8.58,0,11.4,0.04,14.13,1.4c1.66,0.83,2.77,2.15,2.9,4.07c0.1,1.44,0.09,2.9,0.09,4.35
        c0,0.4,0.09,0.62,0.5,0.72c0.36,0.09,0.7,0.23,1.04,0.37c0.59,0.23,0.83,0.79,0.58,1.36c-0.05,0.1-0.27,0.2-0.4,0.19
        c-0.49-0.05-0.98-0.14-1.48-0.22C17.32,12.24,17.26,12.24,17.13,12.24z"/>
      <path class="st1" d="M13.95,13.63c0.53-1.12,1.04-2.21,1.57-3.3c0.11-0.22,0.1-0.37-0.15-0.47c-0.66-0.26-1.3-0.6-1.98-0.76
        c-2.37-0.57-4.76-0.55-7.14,0c-0.78,0.18-1.56,0.41-2.21,0.96c0.28,0.61,0.55,1.2,0.83,1.79c0.28,0.6,0.57,1.19,0.85,1.79
        C7.68,12.67,11.87,12.64,13.95,13.63z"/>
      <path class="st1" d="M13.58,25.16c-2.53,0.73-4.99,0.72-7.5,0.01c-0.42,0.66-0.87,1.34-1.28,2.03c-0.04,0.07,0.06,0.33,0.15,0.38
        c0.38,0.19,0.77,0.38,1.17,0.5c2.32,0.65,4.66,0.65,7,0.11c0.65-0.15,1.27-0.36,1.84-0.8C14.5,26.62,14.04,25.89,13.58,25.16z"/>
      <path class="st1" d="M15.76,13.24c-0.04,0-0.07-0.01-0.11-0.01c-0.35,0.54-0.75,1.06-1.03,1.62c-0.22,0.43-0.4,0.9-0.41,1.35
        c-0.04,1.91,0.04,3.82-0.04,5.73c-0.04,1.05,0.98,1.66,1.58,2.45C15.76,20.66,15.76,16.95,15.76,13.24z"/>
      <path class="st1" d="M3.9,24.38c0.03,0.01,0.06,0.02,0.09,0.02c0.35-0.46,0.75-0.9,1.04-1.38c0.19-0.3,0.33-0.66,0.33-1
        c0.05-1.61-0.05-3.22,0.08-4.82c0.12-1.5-0.61-2.74-1.55-4.08C3.9,16.95,3.9,20.66,3.9,24.38z"/>
      <path class="st1" d="M6.9,2.68c0-0.42-0.15-0.51-0.55-0.37C5.3,2.67,4.56,3.37,4.1,4.37C3.93,4.75,4.04,5.11,4.4,5.32
        c0.39,0.23,0.83,0.17,1.06-0.17c0.38-0.58,0.75-1.17,1.11-1.76C6.72,3.13,6.82,2.85,6.9,2.68z"/>
      <path class="st1" d="M13.18,2.23c-0.52,0.08-0.46,0.38-0.34,0.59c0.47,0.83,0.96,1.64,1.47,2.44c0.06,0.1,0.24,0.15,0.37,0.18
        c0.37,0.07,0.73-0.08,0.86-0.4c0.1-0.23,0.07-0.62-0.07-0.83c-0.35-0.51-0.75-1-1.21-1.4C13.94,2.52,13.49,2.38,13.18,2.23z"/>
      <path class="st2" d="M13.84,24.97c-1.73,0.65-3.24,0.73-4,0.73c-0.68,0-2.28-0.05-4.13-0.75c-0.03-0.01-0.07-0.13-0.07-0.13
        c0-3.66,0-7.31,0-10.97c0,0,0.03-0.1,0.06-0.11c0,0,0.63-0.32,1.31-0.52c1.01-0.3,2.73-0.31,2.87-0.31c2.73,0,3.65,0.57,4.02,0.84
        c0.03,0.02,0.07,0.15,0.07,0.15c0,0.64,0,7.21,0,10.9C13.97,24.79,13.9,24.95,13.84,24.97z"/></g>
      <rect width="${20 + (name.length * 6)}" height="22" rx="10" x="25" y="5" fill="#cb372b"/>
      <text x="30" y="20"
            text-anchor="start" fill="#FFF"
            font-size="12px" font-family="sans-serif" font-weight="bold">
            ${name}
      </text>
    </svg>`;
  }

  encodeSVG(rawSvgString: string): string {
    const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

    // Use single quotes instead of double to avoid URI encoding
    rawSvgString = rawSvgString
      .replace(/'/g, '"')
      .replace(/>\s+</g, '><')
      .replace(/\s{2,}/g, ' ');

    return (
      'data:image/svg+xml;utf-8,' +
      rawSvgString.replace(symbols, encodeURIComponent)
    );
  }
}
