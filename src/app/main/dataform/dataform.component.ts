import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.scss']
})
export class DataformComponent implements OnInit {
  public dataDate = new Date();
  public categories: Category[] = [
    new Category('Gastos', '1', 'father'),
    new Category('Ingresos', '2', 'father')
  ];
  public dataName: string;
  public dataAmount: string;
  public accounts: string;

  constructor() { }

  ngOnInit() {
  }

}
