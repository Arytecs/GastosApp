import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  statusMenu = false;
  constructor() {}

  // Buscar toggle de angular.
  ngOnInit() {}

  public toggleMenu() {
    this.statusMenu = !this.statusMenu;
  }
}
