import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeaderMenuService } from '../_services/headerMenu.service';
import { FooterMenuService } from '../_services/footerMenu.service';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-feheader',
  templateUrl: './feheader.component.html',
  styleUrls: ['./feheader.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeheaderComponent implements OnInit {
    title = 'footer';
    loggedIn = false;
    constructor( public router: Router, public headerMenu: HeaderMenuService,
                 private userService: UserService,
                 private alertService: AlertService) {

    }
    ngOnInit() {

        this.userService.checkSession().subscribe(
            data => {
                if(data.response === 'success'){
                    this.loggedIn = true;
                }else{
                    this.loggedIn = false;
                }
            },
            error => {
                // console.log(error);
            });
    }
    home() {
        // this.router.navigate(['/home']);
        window.location.href = '';
    }
    login() {
        this.router.navigate(['/login']);
    }
}
