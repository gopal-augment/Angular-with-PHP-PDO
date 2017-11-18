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
    public searchLocation: FormControl;
    public zoom: number;

    @ViewChild('search') searchElementRef;
    // public searchElementRef: ElementRef;

    /*********/
    @ViewChild('fileInput') fileInput;
    @ViewChild('aboutFile') aboutFile;
    bioRegionModel: any = {};
    fileInputValidation = false;
    loading = false;
    totalFileCount: any = 0;
    allBioRegion: any =[];
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
        this.zoom = 5;
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
        // console.log('dragEnd', $event.coords);
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
                        // this.Marker.buildingNum = rsltAdrComponent[resultLength-8].short_name;
                        // this.marker.streetName = rsltAdrComponent[resultLength-7].short_name;
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

    getAllBioRegion() {
        this.loading = true;
        this.mybioregionService.getAllBioRegion()
            .subscribe(
                data => {
                    this.allBioRegion = data.items;
                    for (let region of this.allBioRegion) {
                        this.markers.push({
                            lat: region.locLatitude,
                            lng: region.locLongitude,
                            label: region.regionName,
                            draggable: true,
                            title: region.locationAddress
                        });

                    }
                    console.log(this.markers);
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }

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
            if(this.totalFileCount >= 0){
                formData.append('totalFileCount', this.totalFileCount);
                formData.append('latitude', this.latitude);
                formData.append('longitude', this.longitude);
                formData.append('bioRegionName', this.bioRegionModel['bioRegionName']);
                formData.append('searchLocation', this.bioRegionModel['searchLocation']);
                this.loading = true;
                this.mybioregionService.saveMyBioRegion(formData).subscribe(data => {
                        if(data.response === 'failed'){
                            this.alertService.error(data.items);
                        }else{
                            this.alertService.success('Successfully added your region!', true);
                            uploadForm.resetForm('');
                            this.bioRegionModel['searchLocation'] = '';
                            this.fileInput.nativeElement.value = '';
                            setTimeout(() => {
                                this.resetAlertForm();
                            },3000 );
                        }
                        this.loading = false;
                    },
                    error => {
                        this.loading = false;
                    });
            }else{
                this.fileInputValidation = false;
            }
        }else{
            this.fileInputValidation = false;
        }
    }
    resetAlertForm() {
        this.alertService.error('');
        this.alertService.clearMessage();
    }
    resetFormValues(form: NgForm){
        form.resetForm('');
        this.bioRegionModel['searchLocation'] = '';
    }
    resetTabActiveAdd() {
        this.activateTab = 'newbioregion';
    }
    resetTabActiveList() {
        this.activateTab = 'mybioregion';
    }


    markers: Marker[] = [{
        lat: 51.673858,
        lng: 7.815982,
        label: 'STATIC',
        draggable: true,
        title: 'dd'
    }];

}
// just an interface for type safety.
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    title: string;
}

interface SelectedLocation {
    lat: number;
    lng: number;
}
