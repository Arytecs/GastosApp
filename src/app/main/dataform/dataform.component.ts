import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { Movement } from '../../models/movement.model';
import { CategoryService } from '../../services/category.service';
import { MovementService } from '../../services/movement.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dataform',
  templateUrl: './dataform.component.html',
  styleUrls: ['./dataform.component.scss'],
  providers: [AccountService, UserService, CategoryService, MovementService]
})
export class DataformComponent implements OnInit {

  public accounts;
  public movement: Movement;
  public identity;
  public token;
  public categories;
  public status;
  public branch = false;
  public incomes = [];
  public expenses = [];
  public date;

  @Input() setAccount: Account;

  constructor(
    private _accountService: AccountService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _movementService: MovementService,
    private _locationService: Location
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.date = Date.now();
    this.movement = new Movement('', '', 0, this.date , '', '', '', '');
    this.categories = [];
  }

  ngOnInit() {
    this.getCategories();
    this.getAccounts();

    if (this.setAccount) {
      this.movement.category = this.setAccount.id;
    }
  }

  onSubmit(form) {

    if (!this.branch && this.movement.amount > 0) {
      this.movement.amount = 0 - this.movement.amount;
    }
    if (this.branch && this.movement.amount < 0) {
      this.movement.amount = 0 - this.movement.amount;
    }

    this.movement.userId = this.identity._id;
    this._movementService.createMovement(this.movement, this.token).subscribe(
      response => {
        if (response) {
          this.status = 'success';
          this.branch = false;
          setTimeout( () => {
            this.status = '';
          }, 3000);
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
    form.reset();
  }

  getAccounts() {
    this._accountService.getAccounts(this.token, this.identity._id).subscribe(
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

  getCategories() {
    this._categoryService.getCategories(this.token, this.identity._id).subscribe(
      response => {
        if (response.categories) {
          this.categories = response.categories;
          this.splitCategories();
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

  splitCategories() {

    this.categories.forEach(element => {
      if (element.branch) {
        this.incomes.push(element);
      } else {
        this.expenses.push(element);
      }
    });
  }

  cancel(form) {
    form.reset();
    this._locationService.back();
  }
}
