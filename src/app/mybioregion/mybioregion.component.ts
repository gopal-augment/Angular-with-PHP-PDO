import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgmCoreModule, MapsAPILoader, MouseEvent} from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';
import 'jqueryui';
import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'app-mybioregion',
  templateUrl: './mybioregion.component.html',
  styleUrls: ['./mybioregion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MybioregionComponent implements OnInit {
    public latitude: number;
    public longitude: number;
    public searchLocation: FormControl;
    public zoom: number;

    @ViewChild('search') searchElementRef;
    // public searchElementRef: ElementRef;

    /*********/
    @ViewChild('fileInput') fileInput;
    @ViewChild('aboutFile') aboutFile;
    bioRegionModel: any = {};
    fileInputValidation = true;
    /*********/

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        // set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        // create search FormControl
        this.searchLocation = new FormControl();

        // set current position
        this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    // set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', $event);
    }
}
// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    title: string;
}
