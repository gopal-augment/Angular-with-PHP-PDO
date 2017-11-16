import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AlertService, UserService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-seedsearch',
  templateUrl: './seedsearch.component.html',
  styleUrls: ['./seedsearch.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SeedsearchComponent implements OnInit {

  constructor(public router: Router,
              public http: Http,
              private userService: UserService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
      if (!this.authenticationService.isAuthenticate('myfarm') ) {
          this.router.navigate(['unauthorized']);
      }
  }

}
