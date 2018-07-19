import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }


  ngOnInit() {
    $(".push_menu").click(function(){
      $(".wrapper").toggleClass("active");
 });
  }

}
