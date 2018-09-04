import { Component, OnInit, Type, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  statusMenu = false;
  public Type = Type;
  selectedType: string;

  @Output() statusMainMenu: EventEmitter<boolean> =   new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router) {}

  // Buscar toggle de angular.
  ngOnInit() {}

  public toggleMenu() {
    this.statusMenu = !this.statusMenu;
    this.statusMainMenu.emit(this.statusMenu);
  }

  clickMenuItem(type: string) {
    this.selectedType = type;
    this.router.navigate([type], { relativeTo: this.route });
  }
}
