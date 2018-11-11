import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MovementService } from '../../services/movement.service';
import { AccountService } from '../../services/account.service';
import { Movement } from '../../models/movement.model';

@Component({
  selector: 'app-acc-detail',
  templateUrl: './acc-detail.component.html',
  styleUrls: ['./acc-detail.component.scss'],
  providers: [UserService, MovementService]
})
export class AccDetailComponent implements OnInit {

  public accountId;
  public account: Account;
  public identity;
  public token;
  public status;
  public details = false;
  public total: number;
  public movements: Movement[];

  constructor(route: ActivatedRoute,
    private _userService: UserService,
    private _movementService: MovementService,
    private _accountService: AccountService
    ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.accountId = route.snapshot.params['id'];
    this.total = 0;
  }

  ngOnInit() {
    this._accountService.getAccount(this.token, this.accountId).subscribe(
      response => {
        if (response.account) {
          this.status = 'success';
          this.account = response.account;
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

    this._movementService.getMovements(this.token, this.accountId).subscribe(
      response => {
        if (response.movements) {
          this.movements = response.movements;

          this.movements.forEach(movement => {
            this.total += movement.amount;
          });
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
  }

}
