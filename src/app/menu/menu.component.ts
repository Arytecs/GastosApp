import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import{RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  statusMenu: boolean = false;
  constructor() { }

//Buscar toggle de angular.
  ngOnInit() {
  }

  public toggleMenu() {
    this.statusMenu = !this.statusMenu;
  }

}
