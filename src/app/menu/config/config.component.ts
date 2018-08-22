import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import {Category } from '../../models/category.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgModel } from '@angular/forms';
import { User } from '../../models/user.model';

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
  public emailToShare: string;
  public categoryName: string;
  public categoryId: string;
  public categories: Category[] = [    
    new Category("Alimentación","1","father"),
    new Category("Ingresos","2","father"),
    new Category("Facturas","3","father"),
    new Category("Transporte","4","father"),];
  
  public users : User[] = [
    new User("Victor","1234","victorcm34@gastosapp.com","../../src/assets/userAvatar.jpg")
  ];  
  public confirm: boolean = false;
  
  addAccount(accountName: string){
    this.accounts.push(new Account(accountName));
    this.ngxSmartModalService.getModal('addAcc').close();
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

  doAcction(doAcction: boolean){  
    this.confirm = doAcction
    this.ngxSmartModalService.getModal('confirm').close();
    return confirm;
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

  shareAccount(emailToShare: string, index: number){
    this.accounts[index].shared.push(emailToShare);
    console.log(emailToShare);
    console.log(this.accounts[index].shared)
    const obj: Object = {
      i: index
    }
    this.ngxSmartModalService.setModalData(obj, 'myAcc');
    this.emailToShare= "";
    this.ngxSmartModalService.getModal('myAcc').open();
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
