import { Component, OnInit, Input } from '@angular/core';
import { MovementService } from '../../../services/movement.service';
import { UserService } from '../../../services/user.service';
import { Account } from '../../../models/account.model';
import { Movement } from '../../../models/movement.model';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.scss']
})
export class AccComponent implements OnInit {
  public movements: Movement[];
  public status;
  public token;
  public identity;
  public total: number;

  @Input() account: Account;

  constructor(
    private _movementService: MovementService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.total = 0;
   }

  ngOnInit() {
    this.getMovements();
  }

  getMovements() {

    this._movementService.getMovements(this.token, this.account._id).subscribe(
      response => {
        if (response.movements) {
          this.movements = response.movements;

          this.movements.forEach(mov => {
            this.total += mov.amount;
          });
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
