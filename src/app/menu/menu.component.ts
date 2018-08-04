import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import{RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

//Buscar toggle de angular.
  ngOnInit() {
    $(".push_menu").click(() => {
      $(".wrapper").toggleClass("active");
 });
  }

}
