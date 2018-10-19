import { Component, OnInit, Output } from '@angular/core';
import { MovementService } from '../../services/movement.service';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MovementService, UserService, AccountService]
})
export class HomeComponent implements OnInit {
  public identity;
  public token;
  public accounts;
  public status;

  constructor(
    private _userService: UserService,
    private _accountService: AccountService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.accounts = [];
   }

  ngOnInit() {
    this.accounts = this.getAccounts(this.token, this.identity._id);
  }

  getAccounts(token, id) {
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

}
