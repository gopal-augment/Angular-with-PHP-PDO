import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AlertService } from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertComponent implements OnInit, OnDestroy {

    message: any;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
    ngOnDestroy() {
        // this.alertService.getMessage().unsubscribe();
    }

}
