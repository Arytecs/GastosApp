import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public identity;
  public token: string;
  public isLoginMsg: boolean;
  public isRegisterMsg: boolean;
  public loginMessage: string;
  public registerMessage: string;
  public successMessageRegister = 'Registrado con éxito, empieza a utilizar GastosApp!';
  public statusLogin = true;
  public password2: string;

  constructor(
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _router: Router, private _userService: UserService) {
      this.user = new User('', '', '', '', '', false);
  }

  ngOnInit() {
  }

  changeStatus(isLogin: boolean) {
    this.statusLogin = isLogin;
    this.isLoginMsg = false;
    this.isRegisterMsg = false;
  }

  public onSubmit() {
    this.spinner.show();
    console.log(this.user);

    this._userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;
        if (!this.identity) {
          this.isLoginMsg = true;
          this.registerMessage = 'Error al conseguir los datos del usuario';
          this.spinner.hide();
        } else {
          this.isLoginMsg = false;
          this.identity.avatar = './assets/userAvatar.jpg';
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken();
        }
      },
      error => {
        this.spinner.hide();
        this.isLoginMsg = true;
        if (<any>error != null) {
          this.loginMessage = error.error.message;
        }
      }
    );
  }

  public onRegister() {
    this.spinner.show();
    this._userService.register(this.user).subscribe(
      response => {
        if (!response.user) {
          this.isRegisterMsg = true;
          this.registerMessage = response.message;
        } else {
          this.isRegisterMsg = false;
          this.statusLogin = true;
          this.isLoginMsg = true;
          this.loginMessage = this.successMessageRegister;
        }
        this.spinner.hide();
      },
    error => {
      this.spinner.hide();
      this.isRegisterMsg = true;
      if (error != null) {
        this.loginMessage = error.error.message;
      }
    });
  }

  getToken(): any {
    this._userService.login(this.user, true).subscribe(
      response => {
        this.isLoginMsg = false;
        this.token = response.token;
        if (!this.token) {
          this.isLoginMsg = true;
          this.loginMessage = 'Error al conseguir el token';
        } else {
          localStorage.setItem('token', this.token);
          this._router.navigate(['main/home']);
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.isLoginMsg = true;
        if (<any>error != null) {
          this.loginMessage = error.error.message;
        }
      });
  }

  public keyDownLogin(event, nombre: string, password: string) {
    if (event.keyCode === 13) {
       this.onSubmit();
    }
  }

}
