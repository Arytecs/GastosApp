import { UserService } from './../../services/user.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Account } from '../../models/account.model';
import { Category } from '../../models/category.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { User } from '../../models/user.model';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [UserService, CategoryService, AccountService]
})
export class ConfigComponent implements OnInit, AfterViewChecked {
  public account: Account;
  public accounts: Account [];
  public newname: string;
  public accountName: string;
  public accountToModify;
  public token;
  public status;
  public identity: User;
  public url: string;
  public categories;
  public newCategory;
  public catDel;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private ref: ChangeDetectorRef,
    private _userService: UserService,
    private _accountService: AccountService,
    private _categoryService: CategoryService
    ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.account = new Account('', '', '../../assets/AccountImg.jpg', '', [], '');
    this.newCategory = new Category('', '', '', '');
    this.accountToModify = new Account('', '', '', '', [], '');
  }

  ngOnInit() {
    this.getAccounts(this.identity._id);
    this.getCategories(this.token, this.identity._id);
  }

  addAccount() {
    this.account.creator = this.identity._id;

    this._accountService.createAccount(this.account, this.token).subscribe(
      response => {
        if (response.account) {
          this.status = 'success';
        }
      },
      error => {
        this.status = 'error';
      }
    );
    this.ngxSmartModalService.getModal('addAcc').close();
    this.getAccounts(this.identity._id);
  }

  getAccounts(id ) {
    this._accountService.getAccounts(this.token, id).subscribe(
      response => {
        if (response.accounts) {
          this.accounts = response.accounts;
        } else {
          this.status = 'error';
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  deleteAccount() {

    this.ngxSmartModalService.getModal('myAcc').close();
    this.ngxSmartModalService.getModal('confirm').open();
  }

  addCategory(category) {

    category.creator = this.identity._id;

    this._categoryService.createCategory(category, this.token).subscribe(
      response => {
        if (response.category) {
          this.status = 'success';
          this.categories.push(response.category);
        }
      },
      error => {
        this.status = 'error';
      }
    );
    this.ngxSmartModalService.getModal('myCate').close();
  }

  getCategories(token, id) {
    this._categoryService.getCategories(token, id).subscribe(
      response => {
        if (response.categories) {
          this.categories = response.categories;
        } else {
          this.status = 'error';
        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  deleteCat(i) {
    this.catDel = this.categories[i];

    if (this.identity._id === this.catDel.creator) {
      this.ngxSmartModalService.getModal('confirmCat').open();

    }
  }

  confirmCate(confirmed: boolean) {

    if (confirmed) {
      this._categoryService.deleteCategory(this.token, this.catDel._id).subscribe(
        response => {
          this.getCategories(this.token, this.identity);
          this.ngxSmartModalService.getModal('confirmCat').close();
        },
        error => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            this.status = 'error';
          }
        }
      );
    } else {
      this.status = 'error';
      this.ngxSmartModalService.getModal('confirmCat').close();
    }

  }

  confirmAcc(doAcction: boolean) {

    if (doAcction && this.accountToModify.creator === this.identity._id) {

      this._accountService.deleteAccount(this.token, this.accountToModify._id).subscribe(
        response => {
          this.getAccounts(this.identity);
          this.ngxSmartModalService.getModal('confirm').close();
        },
        error => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            this.status = 'error';
          }
        }
      );

    } else {
      this.ngxSmartModalService.getModal('confirm').close();
      this.ngxSmartModalService.getModal('myAcc').open();
    }
  }

  modifyAccount(i: number) {
    this.accountToModify = this.accounts[i];
    const obj: Object = { index: i };

    this.ngxSmartModalService.setModalData(obj, 'myAcc');
    this.ngxSmartModalService.getModal('myAcc').open();
  }

  saveAccount() {
    this._accountService.updateAccount(this.token, this.accountToModify).subscribe(
      response => {
        if (response) {
          this.status = 'success';
        }
      },
      error => {
        this.status = 'error';
      }
    );
    this.getAccounts(this.identity._id);
  }

  // addCategory(categoryName: string, categoryId: string, father: Category) {
  //   this.categories.push(new Category(categoryName, categoryId, father.id));
  //   this.categoryName = '';
  //   this.ngxSmartModalService.getModal('myCate').close();
  // }

  // shareAccount(index: number) {
  //   this.accountToModify.shared.push(new User('Araceli', '1234', this.shareTo, './assets/userAvatar.jpg', false));
  //   this.shareTo = '';
  // }

  // deleteShared(index: number) {
  //   this.accountToModify.shared.splice(index, 1);
  // }

  public keyDownAcc(event) {
    if (event.keyCode === 13) {
      this.addAccount();
    }
  }

  // public keyDownCat(event, categoryName: string, categoryId: string, newFather: Category) {
  //   if (event.keyCode === 13) {
  //     this.addCategory(categoryName, categoryId, newFather);
  //   }
  // }

  // public handleFileInput(files: FileList) {
  //   this._userService.setImg(this.identity).subscribe(res => {
  //     console.log(res);
  //   }, error => {
  //     console.log(error);
  //   });
  //   this.identity.avatar = files.item(0).name;
  //   console.log(files.item(0).name);
  // }



  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
}
