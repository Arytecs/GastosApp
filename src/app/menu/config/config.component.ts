import { Component, OnInit, Input, Output } from '@angular/core';
import { Account } from '../../models/account.model';
import { Category } from '../../models/category.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { User } from '../../models/user.model';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, AfterViewChecked {
  public accounts: Account[] = [];
  public accountToModify = new Account('', '');
  public newname: string;
  public accountName: string;
  public shareTo: string;
  public categoryName: string;
  public categoryId: string;
  public categories: Category[] = [
    new Category('Alimentación', '1', 'father'),
    new Category('Ingresos', '2', 'father'),
    new Category('Facturas', '3', 'father'),
    new Category('Transporte', '4', 'father')
  ];
  public users: User[] = [new User('Victor', '1234', 'victorcm34@gastosapp.com', './assets/userAvatar.jpg')];
  public confirm = false;

  constructor(public ngxSmartModalService: NgxSmartModalService, private ref: ChangeDetectorRef) {}

  addAccount(accountName: string) {
    this.accounts.push(new Account(accountName, ''));
    this.ngxSmartModalService.getModal('addAcc').close();
    this.accountName = '';
  }

  saveAccount(index: number) {
    this.accountToModify.name = this.newname;
    this.newname = '';
  }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
    this.ngxSmartModalService.getModal('myAcc').close();
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  ngOnInit() {}

  doAcction(doAcction: boolean) {
    this.confirm = doAcction;
    this.ngxSmartModalService.getModal('confirm').close();
    return confirm;
  }

  modifyAccount(i: number) {
    this.accountToModify = this.accounts[i];
    const obj: Object = {
      index: i
    };
    this.ngxSmartModalService.setModalData(obj, 'myAcc');
    this.newname = '';
    this.ngxSmartModalService.getModal('myAcc').open();
  }

  addCategory(categoryName: string, categoryId: string, father: Category) {
    this.categories.push(new Category(categoryName, categoryId, father.id));
    this.categoryName = '';
    this.ngxSmartModalService.getModal('myCate').close();
  }

  shareAccount(index: number) {
    this.accountToModify.shared.push(new User('Araceli', '1234', this.shareTo, './assets/userAvatar.jpg'));
    this.shareTo = '';
  }

  deleteShared(index: number) {
    this.accountToModify.shared.splice(index, 1);
  }

  public keyDownAcc(event, nombre: string) {
    if (event.keyCode === 13) {
      this.addAccount(nombre);
    }
  }

  public keyDownCat(event, categoryName: string, categoryId: string, newFather: Category) {
    if (event.keyCode === 13) {
      this.addCategory(categoryName, categoryId, newFather);
    }
  }
}
