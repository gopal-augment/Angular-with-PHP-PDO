import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HeaderMenuService } from '../_services/headerMenu.service';
import { FooterMenuService } from '../_services/footerMenu.service';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit{
    model: any = {};
    loading = false;
    constructor(public router: Router,
                public http: Http,
                public headerMenu: HeaderMenuService,
                public footerMenu: FooterMenuService,
                private userService: UserService,
                private alertService: AlertService)
    {
        this.userService.checkSession().subscribe(
            data => {
                if(data.response === 'success'){
                    this.router.navigate(['/dashboard']);
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    ngOnInit() {
        this.headerMenu.hide();
        this.footerMenu.hide();
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    checkEmailExist(mailele){
        this.loading = true;
        var mailid = mailele.value;
        this.userService.checkEmailExist(mailid)
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
}
