import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {Appointment} from "../../_models/appointment/Appointment";
import {ApiService} from "../../_services/api.service";
import {formatDate} from "@angular/common";
import {Calendar} from "../../_models/calendar/Calendar";

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {
  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild('radiusCircle') circle: ElementRef;
  @ViewChild(GoogleMap) map: GoogleMap
  @ViewChild(MapInfoWindow) info: MapInfoWindow
  loading = false;
  mode: ProgressSpinnerMode = 'determinate';
  zoom = 9
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: false,
    scrollwheel: true,
    mapTypeId: 'roadmap',
    maxZoom: 15,
    minZoom: 6,
  }
  markers: any[] = []
  radius: any[] = []
  infoContent = ''
  appointments: Appointment[] = [];
  calendars: Calendar[] = [];
  owner: string = '';
  address: string = '';
  loadingCals = false;

  constructor(@Inject(ApiService)private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadingCals = true;
    this.apiService.getUserCalendars().subscribe(c => {
      this.calendars = c;
      this.loadingCals = false;
    })
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

  setRadius() {
    this.radius = [];
    this.radius.push({
      center: this.center,
      radius: 25000,
      options: {
        fillColor: 'orange',
        fillOpacity: 0.10,
        strokeColor: 'darkorange'
      }
    });
    this.radius.push({
      center: this.center,
      radius: 20000,
      options: {
        fillColor: 'green',
        fillOpacity: 0.15,
        strokeColor: 'darkgreen'
      }
    });

    this.zoom = 9;
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoContent = content
    // @ts-ignore
    this.info.open(marker)
  }

  onSearch() {
    if (this.address === '' || this.owner === '') {
      return;
    }
    this.loading = true;
    this.markers = [];
    this.apiService.searchNearbyEvents(this.center.lat, this.center.lng, this.owner).subscribe(apos => {
      this.appointments = apos;
      apos.forEach(apo => {
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
          info: formatDate(apo.start.dateTime, 'dd-MM-yyyy hh:mm', 'en-US'),
          icon: {
            fillColor: "blue",
          },
          options: {
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
}
