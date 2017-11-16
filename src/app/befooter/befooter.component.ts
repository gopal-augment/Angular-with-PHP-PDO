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
      this.addJsScript('../../assets/be/vendor/jquery/jquery.min.js');
      this.addJsScript('../../assets/be/vendor/bootstrap/js/bootstrap.min.js');
      this.addJsScript('../../assets/be/vendor/metisMenu/metisMenu.min.js');
      this.addJsScript('../../assets/be/dist/js/sb-admin-2.js');
      // Datatable
      // this.addJsScript('../../assets/be/vendor/datatables/js/jquery.dataTables.min.js');
      // this.addJsScript('../../assets/be/vendor/datatables-plugins/dataTables.bootstrap.min.js');
      // this.addJsScript('../../assets/be/vendor/datatables-responsive/dataTables.responsive.js');
  }

  addJsScript(url){
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = url;
      $('head').append(s);
  }

}
