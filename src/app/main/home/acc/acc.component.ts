import { Component, OnInit, Input } from '@angular/core';
import { MovementService } from '../../../services/movement.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss']
})
export class AccComponent implements OnInit {
  public movements;
  public status;
  public token;
  public identity;

  @Input() account: Account;

  constructor(
    private _movementService: MovementService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.movements = this.getMovements(this.token, this.account.id);
    console.log(this.account);
  }

  getMovements(token, account) {

    this._movementService.getMovements(token, account._id).subscribe(
      response => {
        if (response.categories) {
          this.movements = response.categories;
          console.log(this.movements);
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
