import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { Component, OnInit, DoCheck } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, AccountService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'new-struct';

  public identity: User;
  description = 'Curso de introducción a angular 5';
  constructor(private _userService: UserService) {
    this.title = 'NGSOCIAL';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
}
