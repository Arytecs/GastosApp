import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  statusMenu: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(event: boolean) {
    this.statusMenu = event;
  }

}
