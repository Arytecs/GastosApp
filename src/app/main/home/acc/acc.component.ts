import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovementService } from '../../../services/movement.service';
import { UserService } from '../../../services/user.service';
import { Account } from '../../../models/account.model';
import { Movement } from '../../../models/movement.model';
import { Router } from '@angular/router';

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
  public transfer = false;
  public transf: Movement;
  public date;

  @Input() account: Account;
  @Input() accounts = [];
  @Output() setAccount: EventEmitter<Account> = new EventEmitter<Account>();

  constructor(
    private _movementService: MovementService,
    private _userService: UserService,
    private router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.total = 0;
    this.date = Date.now();
    this.transf = new Movement('', '', 0, this.date , '', '', '', '');   }

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

  setTransfer() {
    this.transfer = !this.transfer;
  }

  sendTransfer() {

    if (this.total >= this.transf.amount && this.transf.amount > 0) {
      this.transf.category = 'Transferencia';
      this.transf.userId = this.identity._id;
      this._movementService.createMovement(this.transf, this.token).subscribe (
        response => {
        if (response.movement) {
          this.status = 'success';
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
      });

      this.transf.amount = 0 - this.transf.amount;
      this.transf.account = this.account._id;

      this._movementService.createMovement(this.transf, this.token).subscribe (
        response => {
        if (response.movement) {
          this.status = 'success';
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
      });
      this.transfer = false;
      this.getMovements();
    } else {
      this.status = 'error';
      console.log('no hay dinero');
    }
  }


}
