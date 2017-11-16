import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenuService } from '../_services/headerMenu.service';
import { AlertService, UserService, AuthenticationService } from '../_services/index';
import * as $ from 'jquery';

@Component({
  selector: 'app-beheader',
  templateUrl: './beheader.component.html',
  styleUrls: ['./beheader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BeheaderComponent implements OnInit {
    loggeinuserdetail: any = {};
    isManager: boolean = false;

  constructor( public router: Router, public headerMenu: HeaderMenuService,
               private userService: UserService,
               private alertService: AlertService,
               private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
      this.userService.checkSession().subscribe(
          data => {
              if(data.response === 'success'){
                  this.loggeinuserdetail = data.items;
              }else{
                  //this.router.navigate(['/login']);
                  window.location.href = '/login';
              }
          },
          error => {
              // console.log(error);
          });
  }

  isAuthenticate(menuName){
     return this.authenticationService.isAuthenticate(menuName);
  }
  logout() {
      this.userService.logout()
          .subscribe(
              data => {
                  if(data.response === 'success'){
                      localStorage.removeItem('currentUser');
                      // localStorage.clear();
                      this.alertService.success('Logout successful', true);
                      this.router.navigate(['/login']);
                  }else{
                      this.alertService.error(data.message, true);
                  }
              },
              error => {
                  this.alertService.error(error);
              });
  }

  toggleClass() {
      $('.row-offcanvas').toggleClass('active');
      $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
      $('#main').toggleClass('column').toggleClass('col-lg-10').toggleClass('col-lg-11 side-hidden');
  }
}

