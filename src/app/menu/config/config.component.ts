import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import {Category } from '../../models/category.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public accounts: Account[] = [];
  public accountToModify = new Account('');
  public newname: string;
  public accountName: string;
  public categoryName: string;
  public categoryId: string;
  public categories: Category[] = [    
    new Category("Alimentación","1","father"),
    new Category("Ingresos","2","father"),
    new Category("Facturas","3","father"),
    new Category("Transporte","4","father"),];
  
  addAccount(accountName: string){
    this.accounts.push(new Account(accountName));
    this.ngxSmartModalService.getModal('myModal').close();
    this.accountName = "";
  }
  
  saveAccount(newname: string, index : number){
    this.accounts[index].name= newname;    
  }

  deleteAccount(index : number){
    this.accounts.splice(index,1);
    this.ngxSmartModalService.getModal('myAcc').close();
  }

  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  modifyAccount(i:number){
    this.accountToModify = this.accounts[i];
    const obj: Object = {
      index: i
    }
    this.ngxSmartModalService.setModalData(obj, 'myAcc');
    this.newname = "";
    this.ngxSmartModalService.getModal('myAcc').open()
  }

  addCategory(categoryName: string, categoryId: string, father: Category){
    this.categories.push(new Category(categoryName, categoryId , father.id));
    this.categoryName = "";
  }

  public keyDownAcc(event, nombre:string){
    if(event.keyCode == 13) {
      this.addAccount(nombre);
    }
  }

  public keyDownCat(event, categoryName: string, categoryId: string, newFather: Category){
    if(event.keyCode == 13) {
      this.addCategory(categoryName, categoryId, newFather);
    }
  }

}
