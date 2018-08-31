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
    new Category('Alimentación', '1', 'father'),
    new Category('Ingresos', '2', 'father'),
    new Category('Facturas', '3', 'father'),
    new Category('Transporte', '4', 'father'),
    new Category('Transporte2', '4', '1')
  ];
  public dataName: string;
  public dataAmount: string;
  public accounts: string;

  constructor() { }

  ngOnInit() {
  }

}
