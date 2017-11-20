import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgmCoreModule, MapsAPILoader, MouseEvent} from '@agm/core';
import { FormControl, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import * as $ from 'jquery';
import 'jqueryui';
import {} from '@types/googlemaps';
import {stringDistance} from 'codelyzer/util/utils';
import { MybioregionService } from '../_services/mybioregion.service';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
declare var google: any;

@Component({
  selector: 'app-mybioregion',
  templateUrl: './mybioregion.component.html',
  styleUrls: ['./mybioregion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MybioregionComponent implements OnInit {
    public latitude: any;
    public longitude: any;
    public latitudeZoom: number;
    public longitudeZoom: number;
    public latitudeDefault: number;
    public longitudeDefault: number;
    public searchLocation: FormControl;
    public zoom: number;
    alphaNumeric: number;
    alphaLetter: string;
    alphaNum2: number;
    @ViewChild('search') searchElementRef;
    // public searchElementRef: ElementRef;

    /*********/
    @ViewChild('fileInput') fileInput;
    @ViewChild('aboutFile') aboutFile;
    bioRegionModel: any = {};
    fileInputValidation = false;
    loading = false;
    totalFileCount: any = 0;
    allBioRegion: any = [];
    activateTab = 'mybioregion';
    // markers: any;
    /*********/

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private mybioregionService: MybioregionService,
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        // set google maps defaults
        this.zoom = 3;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        // create search FormControl
        this.searchLocation = new FormControl();

        // set current position
        this.setCurrentPosition();

        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['geocode']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    this.bioRegionModel['searchLocation'] = place.formatted_address;
                    // set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 9;
                });
            });
        });

        this.getAllBioRegion();
    }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 9;
            });
        }
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        this.getGeoLocation($event.coords.lat, $event.coords.lng);
    }

    getGeoLocation(lat: number, lng: number) {
        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(lat, lng);
            let request = { latLng: latlng };

            geocoder.geocode(request, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    let rsltAdrComponent = result.address_components;
                    let resultLength = rsltAdrComponent.length;
                    if (result != null) {
                        this.bioRegionModel['searchLocation'] = result.formatted_address;
                        this.latitude = lat;
                        this.longitude = lng;
                    } else {
                        alert('No address available!');
                    }
                }
            });
        }
    }
    /********File Validate*******/
    allowedExtensions =
        ['image/png', 'image/gif', 'image/jpeg', 'image/jpg', 'image/JPG', 'image/JPEG', 'image/GIF', 'image/PNG'];
    fileErrorMessage: string = 'Atleast one file should select';
    fileRegionValidate(event) : any {
        for (let image of event.target.files) {
            let imageType = image.type;
            if (this.isInArray(this.allowedExtensions, imageType)) {
                this.fileErrorMessage = 'Atleast one file should select';
                this.fileInputValidation = true;
            }else{
                this.fileErrorMessage = ' Image file format png, gif, jpg, jpeg only accepted';
                this.fileInputValidation = false;
                event.preventDefault();
            }
        }
    }
    isInArray(array, word) {
        return array.indexOf(word.toLowerCase()) > -1;
    }
    /******************************************************************************************/


    markers: Marker[] = [];

    getAllBioRegion() {
        this.markers = [];
        this.loading = true;
        this.mybioregionService.getAllBioRegion()
            .subscribe(
                data => {
                    this.allBioRegion = data.items;
                    var dynamicLat = this.latitude;
                    var dynamicLong = this.longitude;
                    var sumlat =0;
                    var sumlng = 0;
                    var i = 1;
                    for (let region of this.allBioRegion) {
                        var markerLabel = this.getNameFromNumber(i);
                        this.markers.push({
                            lat: Number(region.locLatitude),
                            lng: Number(region.locLongitude),
                            label: markerLabel,
                            draggable: false,
                            title: String(region.locationAddress)
                        });

                        dynamicLat = region.locLatitude;
                        dynamicLong = region.locLongitude;
                        this.allBioRegion[ i - 1 ]['dispLabel'] = markerLabel;
                        sumlat = sumlat + parseFloat(region.locLatitude);
                        sumlng = sumlng + parseFloat(region.locLongitude);
                        i++;
                    }
                    this.latitude = dynamicLat;
                    this.longitude = dynamicLong;

                    this.zoom = 6;
                    this.latitudeZoom = this.latitudeDefault = (sumlat / ( i - 1 ));
                    this.longitudeZoom = this.longitudeDefault = (sumlng / ( i - 1 ));
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

    /******GET NAME FOR NUMBERS******/

    getNameFromNumber($num) {
        this.alphaNumeric  = ($num - 1) % 26;
        this.alphaLetter = String.fromCharCode(65 + this.alphaNumeric);
        this.alphaNum2 = Math.round((($num - 1) / 26));
        if (this.alphaNum2 > 0) {
            return this.getNameFromNumber(this.alphaNum2) + this.alphaLetter;
        } else {
            return this.alphaLetter;
        }
    }
    mouseEnterListMap(lat, lng) {
        this.latitudeZoom = parseFloat(lat);
        this.longitudeZoom = parseFloat(lng);
        this.zoom = 12;
    }
    mouseLeaveListMap(lat, lng) {
        this.latitudeZoom = lat;
        this.longitudeZoom = lng;
        this.zoom = 6;
    }
    /********************SAVE MY BIO REGION*************************/

    saveMyBioRegion(uploadForm: NgForm) {
        let fileBrowser = this.fileInput.nativeElement;
        this.fileInputValidation = true;

        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            var files = fileBrowser.files;
            this.totalFileCount = -1;

            for (var i = 0; i < files.length; i++) {
                formData.append('image-' + i, fileBrowser.files[i]);
                this.totalFileCount = i;
            }
            if (this.totalFileCount >= 0) {
                formData.append('totalFileCount', this.totalFileCount);
                formData.append('latitude', this.latitude);
                formData.append('longitude', this.longitude);
                formData.append('bioRegionName', this.bioRegionModel['bioRegionName']);
                formData.append('searchLocation', this.bioRegionModel['searchLocation']);
                this.loading = true;
                this.mybioregionService.saveMyBioRegion(formData).subscribe(data => {
                        if(data.response === 'failed') {
                            this.alertService.error(data.items);
                        }else {
                            this.alertService.success('Successfully added your region!', true);
                            uploadForm.resetForm('');
                            this.bioRegionModel['searchLocation'] = '';
                            this.fileInput.nativeElement.value = '';
                            this.getAllBioRegion();
                            setTimeout(() => {
                                this.resetAlertForm();
                                this.resetTabActiveList();
                            }, 3000 );
                        }
                        this.loading = false;
                    },
                    error => {
                        this.loading = false;
                    });
            }else {
                this.fileInputValidation = false;
            }
        }else {
            this.fileInputValidation = false;
        }
    }
    resetAlertForm() {
        this.alertService.error('');
        this.alertService.clearMessage();
    }
    resetFormValues(form: NgForm) {
        form.resetForm('');
        this.bioRegionModel['searchLocation'] = '';
    }
    resetTabActiveAdd() {
        this.activateTab = 'newbioregion';
    }
    resetTabActiveList() {
        this.activateTab = 'mybioregion';
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
interface LatLng {
    constructor(lat: number, lng: number): void;
    lat(): number;
    lng(): number;
}
