import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-befooter',
  templateUrl: './befooter.component.html',
  styleUrls: ['./befooter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BefooterComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
      this.addJsScript('../../assets/be/js/jquery-2.1.4.min.js');
      this.addJsScript('../../assets/be/js/bootstrap.min.js');
      this.addJsScript('../../assets/be/js/plugins/pace.min.js');
      this.addJsScript('../../assets/be/js/main.js');
      // Datatable
      // this.addJsScript('../../assets/be/js/plugins/jquery.dataTables.min.js');
      // this.addJsScript('../../assets/be/js/plugins/dataTables.bootstrap.min.js');
  }

  addJsScript(url){
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = url;
      $('head').append(s);
  }

}
