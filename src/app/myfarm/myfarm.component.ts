import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { MyfarmService } from '../_services/myfarm.service';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { GlobalVariable } from '../GlobalConfig';

@Component({
  selector: 'app-myfarm',
  templateUrl: './myfarm.component.html',
  styleUrls: ['./myfarm.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyfarmComponent implements OnInit {
    baseApiUrl = GlobalVariable.BASE_API_URL;
    baseFolderUrl = GlobalVariable.BASE_FOLDER_URL;
  @ViewChild('fileInput') fileInput;
  @ViewChild('aboutFile') aboutFile;
  uploadFileModel: any = {};
  loading = false;
  totalFileCount: any = 0;
  fileInputValidation = true;
  galleryFiles: any = [];

  constructor(public router: Router,
              public http: Http,
              private myfarmService: MyfarmService,
              private userService: UserService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
      if (!this.authenticationService.isAuthenticate('myfarm') ) {
          this.router.navigate(['unauthorized']);
      }
      this.getAdminUserList();
  }
  getAdminUserList() {
    this.loading = true;
    this.myfarmService.getAllGalleryFiles()
        .subscribe(
            data => {
                this.galleryFiles = data.items;
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
  }
  upload(uploadForm: NgForm) {
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
              formData.append('aboutFile', this.aboutFile['value']);
              this.loading = true;
              this.myfarmService.uploadSeedFile(formData).subscribe(data => {
                      if(data.response === 'failed'){
                          this.alertService.error(data.items);
                      }else{
                          this.alertService.success('Successfully uploaded!', true);
                          uploadForm.resetForm('');
                          this.galleryFiles = data.items;
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
      }
  }
    resetAlertForm() {
        this.alertService.error('');
        this.alertService.clearMessage();
    }
    resetFormValues(form: NgForm){
        form.resetForm('');
    }

}
