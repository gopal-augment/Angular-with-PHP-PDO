import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

import { AlertService, UserService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {
    usermodel: any = {};
    adminUserList: any = [];
    adminUserDetail: any = [];
    printAdminUserDetail: any = [];
    adminUserRole: any = [];

    loading = false;
    newUserAdd = true;
    existUserEdit = false;
    activateTab = 'listusers';
    message: string;
    @ViewChild('viewAdminUserDetail') viewAdminUserDetail;
    constructor(public router: Router,
                public http: Http,
                private userService: UserService,
                private alertService: AlertService,
                private authenticationService: AuthenticationService) { }

  ngOnInit() {
      if (!this.authenticationService.isAuthenticate('users') ) {
          this.router.navigate(['unauthorized']);
      }
      this.getAdminUserList();
      this.usermodel['userRole'] = '';
      this.message = '';
  }
  getAdminUserList() {
    this.loading = true;
    this.userService.getAdminUserList()
        .subscribe(
            data => {
                this.adminUserList = data.items['userList'];
                this.adminUserRole = data.items['userRole'];
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
  }
    /****ADD NEW USERS / EDIT USERS****/
  addAdminUsers(userForm: NgForm) {
      this.loading = true;
      this.userService.addAdminUsers(this.usermodel)
          .subscribe(
              data => {
                  this.alertService.success('Successfully User Added!', true);
                  this.loading = false;
                  this.activateTab = 'listusers';
                  this.getAdminUserList();
                  userForm.resetForm('');
                  setTimeout(() => {
                      this.resetAlertForm();
                  },3000 );
              },
              error => {
                  this.alertService.error('Technical Error');
                  this.loading = false;
              });
  }
  /*****CHECK USER EMAILAIL EXISTING*****/
  checkUserEmailExist(mailele) {
      this.loading = true;
      var mailid = mailele.value;
      var editUserId = this.usermodel['userID'];
      this.userService.checkUserEmailExist(mailid, editUserId)
          .subscribe(
              data => {
                  if(data.response === 'success'){
                      this.loading = false;
                  }else{
                      this.loading = false;
                      this.alertService.error(data.message, true);
                      mailele.focus();
                  }
              },
              error => {
                  //this.alertService.error(error);
                  this.loading = false;
              });
  }
  /*******EDIT ADMIN USERS*****/
  editAdminUser(userID) {
    this.loading = true;
    this.userService.getAdminUserDetail(userID)
        .subscribe(
            data => {
                this.adminUserDetail = data.items;
                this.usermodel['userFirstName'] = this.adminUserDetail.firstName;
                this.usermodel['userLastName'] = this.adminUserDetail.lastName;
                this.usermodel['userEmailId'] = this.adminUserDetail.emailId;
                this.usermodel['userRole'] = this.adminUserDetail.userRole;
                this.usermodel['userID'] = this.adminUserDetail.userID;
                this.newUserAdd = false;
                this.existUserEdit = true;
                this.activateTab = 'addusers';
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
  }
  /*******VIEW ADMIN USERS*****/
  viewAdminUser(userID) {
    this.loading = true;
    this.userService.viewAdminUserDetail(userID)
        .subscribe(
            data => {
                this.viewAdminUserDetail.nativeElement.className = 'modal fade show in';
                this.printAdminUserDetail = data.items;
                this.loading = false;
            },
            error => {
                this.loading = false;
            });
  }
    /*******DELETE ADMIN USERS*****/
  deleteAdminUser(userID) {

    if (window.confirm('Are you sure to delete this user?')) {
        this.loading = true;
        this.userService.deleteAdminUserDetail(userID)
            .subscribe(
                data => {
                    this.adminUserList = data.items;
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }
  }

  closeViewAdminUser() {
      this.viewAdminUserDetail.nativeElement.className = 'modal fade';
  }
  resetAlertForm() {
      this.alertService.error('');
      this.alertService.clearMessage();
  }
  resetFormValues(form: NgForm){
      form.resetForm('');
  }
    resetTabActiveAdd() {
        this.activateTab = 'addusers';
    }
    resetTabActiveList() {
        this.activateTab = 'listusers';
    }
}

