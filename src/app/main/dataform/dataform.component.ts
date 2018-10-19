import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';
import { Movement } from '../../models/movement.model';
import { CategoryService } from '../../services/category.service';
import { MovementService } from '../../services/movement.service';

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

  constructor(
    private _accountService: AccountService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _movementService: MovementService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.movement = new Movement('', '', 0, '', '', '', '');
  }

  ngOnInit() {
    this.getAccounts(this.token, this.identity._id);
    this.getCategories(this.token, this.identity._id);
  }

  onSubmit(form) {
    this.movement.userId = this.identity._id;
    console.log(this.movement);
    this._movementService.createMovement(this.movement, this.token).subscribe(
      response => {
        if (response) {
          console.log('holi');
          this.status = 'success';
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

  getAccounts(token, id ) {
    this._accountService.getAccounts(token, id).subscribe(
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
}
