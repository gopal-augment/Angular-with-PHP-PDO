import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-fefooter',
  templateUrl: './fefooter.component.html',
  styleUrls: ['./fefooter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FefooterComponent implements OnInit, AfterViewInit {

    constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.addJsScript('../../assets/fe/js/scripts.min.js');
      this.addJsScript('../../assets/fe/js/custom.js');
  }

  addJsScript(url){
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    $('head').append(s);
  }

}
