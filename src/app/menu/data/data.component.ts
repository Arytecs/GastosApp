import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public dataDate = new Date();
  public categories: Category[] = [
    new Category('Alimentación', '1', 'father'),
    new Category('Ingresos', '2', 'father'),
    new Category('Facturas', '3', 'father'),
    new Category('Transporte', '4', 'father'),
    new Category('Transporte2', '4', '1')
  ];
  constructor() {}

  ngOnInit() {}
}
