import {Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {Appointment} from "../../../_models/appointment/Appointment";
import {ApiService} from "../../../_services/api.service";
import {formatDate} from "@angular/common";
import {Calendar} from "../../../_models/calendar/Calendar";

const calendars: Calendar[] = [
  {
    name: 'Sil Kuppens',
    id: '238951387',
    color: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  },
  {
    name: 'Harm Verstappen',
    id: '260463341',
    color: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  },
  {
    name: 'Sam Cummins',
    id: '289996526',
    color: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  },
  {
    name: 'Patrick Smolders',
    id: '289992164',
    color: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
  }
]

@Component({
  selector: 'app-afspraken',
  templateUrl: './afspraken.component.html',
  styleUrls: ['./afspraken.component.scss']
})
export class AfsprakenComponent implements OnInit {
  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild('radiusCircle') circle: ElementRef;
  @ViewChildren('somemarker') components:QueryList<MapMarker>;
  @ViewChild(GoogleMap) map: GoogleMap
  @ViewChild(MapInfoWindow) info: MapInfoWindow
  loading = false;
  mode: ProgressSpinnerMode = 'determinate';
  zoom = 9
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    maxZoom: 15,
    minZoom: 6,
  }
  markers: any[] = []
  radius: any[] = []
  infoContent = ''
  appointments: Appointment[] = [];
  calendars: Calendar[] = calendars;
  owners: string[] = [];
  address: string = '';
  loadingCals = false;
  distance: number = 25;
  formatLabel(value: number) {
    if (value >= 10) {
      return value + 'km';
    }

    return value;
  }

  constructor(@Inject(ApiService)private apiService: ApiService) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
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
    });
  }

  onInputChange(event: number | null) {
    if (event != null) {
      this.distance = event;
      this.onSearch();
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
    // @ts-ignore
    this.info.open(marker)
    for (let apo of this.appointments) {
      apo.location.displayName === marker?.getTitle() ? apo.selected = true : apo.selected = false;
    }
  }

  onSearch() {
    if (this.address === '' || this.owners.length === 0) {
      return;
    }

    this.loading = true;
    this.apiService.searchNearbyEvents(this.center.lat, this.center.lng, this.owners, this.distance).subscribe(apos => {
      this.markers = [];
      this.appointments = apos;
      apos.forEach(apo => {
        // @ts-ignore
        const pointer: Calendar = calendars.find( ({ name }) => name === apo.organizer.emailAddress.name.split(' | ')[0] );
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
          info: formatDate(apo.start.dateTime, 'EEEE, dd MMMM, HH:mm', 'nl-NL'),
          options: {
            icon: pointer.color,
            animation: google.maps.Animation.DROP,
          },
        })
      })
      this.setRadius();
      setTimeout(()=>{
        this.searchField.nativeElement.blur();
      },0);
      this.loading = false;
    })
  }

  selectPoint(apo: Appointment) {
    const markerinfo = this.markers.find(({ title }) => title === apo.location.displayName ).info;
    const marker = this.components.find(m => m.getTitle() == apo.location.displayName);
    this.openInfo(marker, markerinfo);
  }
}
