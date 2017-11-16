import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm, FormArray, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery';

import { AlertService, UserService, AuthenticationService } from '../_services/index';
import { MasterService } from '../_services/master.service';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserroleComponent implements OnInit {
    userrolemodel: any = {};
    adminUserRoleList: any = [];
    loading = false;
    disableFormBtn = true;

    adminUserRoleDetail: any = [];
    printAdminUserRoleDetail: any = [];
    newUserRoleAdd = true;
    existUserRoleEdit = false;
    activateTab = 'listuserrole';
    message: string;
    @ViewChild('viewAdminUserDetail') viewAdminUserRoleDetail;

    // Declare just an Array
    accessOptions = [
        {name: 'Dashboards', value: 'dashboard', checked: true},
        {name: 'My Farm', value: 'myfarm', checked: false},
        {name: 'Seed Search', value: 'seedsearch', checked: false},
        {name: 'Users', value: 'users', checked: false}
    ];
    accessEditOptions = [
        {name: 'Dashboard', value: 'dashboard', checked: false},
        {name: 'My Farm', value: 'myfarm', checked: false},
        {name: 'Seed Search', value: 'seedsearch', checked: false},
        {name: 'Users', value: 'users', checked: false}
    ];
    setAccessEditOptions = [];
    setAccessMenuOptions = [];
    // Check box selected
    selectedAccessOptions() {
        return this.setAccessMenuOptions;
        // return this.accessOptions
        //     .filter(opt => opt.checked)
        //     .map(opt => opt.value);
    }

    constructor(public router: Router,
                public http: Http,
                private userService: UserService,
                private alertService: AlertService,
                private authenticationService: AuthenticationService,
                private masterService: MasterService) { }

  ngOnInit() {
      if (!this.authenticationService.isAuthenticate('users') ) {
          this.router.navigate(['unauthorized']);
      }
      this.getAdminUserRoleList();
      // this.getMenuList();
  }

  getMenuList(){
      this.accessOptions = [];
      this.masterService.getMenuList()
          .subscribe(
              data => {
                  this.accessOptions = data.items;
                  this.accessOptions.forEach(obj => {
                      if(obj.checked){
                          this.onChangeAccess(obj.value, true)
                      }
                  });
              },
              error => {
              });
  }
    onChangeAccess(menuName: string, isChecked: boolean) {
        if(isChecked) {
            if(this.setAccessMenuOptions.indexOf(menuName) < 0){
                this.setAccessMenuOptions.push(menuName);
            }
        } else {
            // let index = this.setAccessMenuOptions.findIndex(x => x.value == menuName);
            const index: number = this.setAccessMenuOptions.indexOf(menuName);
            this.setAccessMenuOptions.splice(index, 1);
        }
        if(this.setAccessMenuOptions.length > 0){
            this.disableFormBtn = false;
        }else{
            this.disableFormBtn = true;
        }
    }
  getAdminUserRoleList() {
      this.loading = true;
      this.userService.getAdminUserRoleList()
          .subscribe(
              data => {
                  this.adminUserRoleList = data.items;
                  this.loading = false;
              },
              error => {
                  this.loading = false;
              });
  }

    /****ADD NEW USERS / EDIT USERS ROLES****/
    addAdminUserRole(userForm: NgForm) {
        this.loading = true;
        this.userrolemodel['accessRole'] = this.selectedAccessOptions();
        console.log(this.userrolemodel['accessRole']);
        this.userService.addAdminUserRole(this.userrolemodel)
            .subscribe(
                data => {
                    this.alertService.success('Successfully User Added!', true);
                    this.loading = false;
                    this.activateTab = 'listuserrole';
                    this.adminUserRoleList = data.items;
                    userForm.resetForm('');
                    setTimeout(() => {
                        this.resetAlertForm();
                    },2000 );
                },
                error => {
                    this.alertService.error('Technical Error');
                    this.loading = false;
                });
    }

    /*******EDIT ADMIN USERS ROLES*****/
    editAdminUserRole(roleId) {
        this.loading = true;
        this.setAccessEditOptions = [];
        this.setAccessMenuOptions = [];
        this.getMenuList();
        this.userService.getAdminUserRoleDetail(roleId)
            .subscribe(
                data => {
                    this.activateTab = 'adduserrole';
                    this.adminUserRoleDetail = data.items;
                    this.userrolemodel['userRoleName'] = this.adminUserRoleDetail.roleName;
                    this.userrolemodel['roleId'] = this.adminUserRoleDetail.roleId;
                    this.accessEditOptions = this.adminUserRoleDetail.roleAccess;

                    this.accessEditOptions.forEach(obj => {
                        this.setAccessEditOptions.push(obj.value);
                        if(obj.checked){
                            this.onChangeAccess(obj.value, true)
                        }
                    });
                    if(this.setAccessMenuOptions.length == 0){
                        this.accessOptions.forEach(obj => {
                            if(obj.checked && this.setAccessMenuOptions.indexOf(obj.value) < 0){
                                this.onChangeAccess(obj.value, true)
                            }
                        });
                    }
                    this.newUserRoleAdd = false;
                    this.existUserRoleEdit = true;
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }
    /*******VIEW ADMIN USERS ROLES ROLE*****/
    viewAdminUserRole(roleId) {
        this.loading = true;
        this.userService.viewAdminUserRoleDetail(roleId)
            .subscribe(
                data => {
                    this.viewAdminUserRoleDetail.nativeElement.className = 'modal fade show in';
                    this.printAdminUserRoleDetail = data.items;
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                });
    }
    /*******DELETE ADMIN USERS ROLE*****/
    deleteAdminUserRole(roleId) {
        if (window.confirm('Are you sure to delete this user role?')) {
            this.loading = true;
            this.userService.deleteAdminUserRoleDetail(roleId)
                .subscribe(
                    data => {
                        this.adminUserRoleList = data.items;
                        this.loading = false;
                    },
                    error => {
                        this.loading = false;
                    });
        }
    }

    closeViewAdminUserRole() {
        this.viewAdminUserRoleDetail.nativeElement.className = 'modal fade';
    }
    resetAlertForm() {
        this.alertService.error('');
        this.alertService.clearMessage();
    }
    resetFormValues(form: NgForm){
        form.resetForm('');
    }
    resetTabActiveAdd() {
        this.activateTab = 'adduserrole';
        this.setAccessEditOptions = [];
        this.getMenuList();
    }
    resetTabActiveList() {
        this.activateTab = 'listuserrole';
    }

}
