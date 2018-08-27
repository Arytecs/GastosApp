import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
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
export class ConfigComponent implements OnInit, AfterViewChecked {
  public accounts: Account[] = [];
  public accountToModify;
  public newname: string;
  public accountName: string;
  public emailToShare: string;
  public categoryName: string;
  public categoryId: string;

  public categories: Category[];

  public users: User[];
  public confirm;

  public prueba: number;

  constructor(public ngxSmartModalService: NgxSmartModalService, private ref: ChangeDetectorRef) {
    this.users = [new User('Victor', '1234', 'victorcm34@gastosapp.com', '../../src/assets/userAvatar.jpg')];
    this.categories = [
      new Category('Alimentación', '1', 'father'),
      new Category('Ingresos', '2', 'father'),
      new Category('Facturas', '3', 'father'),
      new Category('Transporte', '4', 'father'), ];
      this.accountToModify = new Account('');
      this.confirm = false;
   }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  addAccount(accountName: string) {
    this.accounts.push(new Account(accountName));
    this.ngxSmartModalService.getModal('addAcc').close();
  }

  saveAccount(newname: string, index: number) {
      this.accounts[index].name = newname;
  }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
    this.ngxSmartModalService.getModal('myAcc').close();
  }


  ngOnInit() {
  }


  doAcction(doAcction: boolean) {
    this.confirm = doAcction;
    this.ngxSmartModalService.getModal('confirm').close();
    return confirm;
  }

  modifyAccount(i: number) {
    console.log('Modify account: ' + i);
    this.prueba = i;
    this.accountToModify = this.accounts[i];
    const obj: Object = {
      index: i
    };
    console.dir(obj);
    this.ngxSmartModalService.setModalData(obj, 'myAcc');
    this.newname = '';
    this.ngxSmartModalService.getModal('myAcc').open();
  }


  addCategory(categoryName: string, categoryId: string, father: Category) {
    this.categories.push(new Category(categoryName, categoryId , father.id));
    this.categoryName = '';
  }

  shareAccount(emailToShare: string, index: number) {
    console.log('Share Account: ' + index);
    this.accounts[index].shared.push(emailToShare);
    console.log(emailToShare);
    console.log(this.accounts[index].shared);
    // const obj: Object = {
    //   i: index
    // };
    // this.ngxSmartModalService.setModalData(obj, 'myAcc');
    // this.emailToShare = '';
    // this.ngxSmartModalService.getModal('myAcc').open();
  }

  keyDownAcc(event, nombre: string) {
    if (event.keyCode === 13) {
      this.addAccount(nombre);
    }
  }

  keyDownCat(event, categoryName: string, categoryId: string, newFather: Category) {
    if (event.keyCode === 13) {
      this.addCategory(categoryName, categoryId, newFather);
    }
  }

}
