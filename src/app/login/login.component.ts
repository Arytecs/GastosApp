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
  public isError: boolean;
  public isErrorRegister: boolean;
  public errorMessage: string;
  public errorMessageRegister: string;
  public statusLogin = true;
  public password2: string;

  constructor(
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute,
    private _router: Router, private _userService: UserService) {
    this.user = new User('', '', '', '', false);
  }


  ngOnInit() {
  }

  changeStatus(isLogin: boolean) {
    this.statusLogin = isLogin;
  }

  public onSubmit() {
    this.spinner.show();
    this._userService.login(this.user).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity._id);
        if (!this.identity && this.identity._id) {
          this.isError = true;
          this.errorMessage = 'Error al conseguir los datos del usuario';
          this.spinner.hide();
        } else {
          this.isError = false;
          // Persistir datos del usuario
          this.identity.avatar = './assets/userAvatar.jpg';
          localStorage.setItem('identity', JSON.stringify(this.identity));
          // Conseguir el TOKEN
          this.getToken();
        }
      },
      error => {
        this.spinner.hide();
        this.isError = true;
        if (<any>error != null) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

  public onRegister() {
    this.spinner.show();
    // Funcion a hacer con Car
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        if (!response.user) {
          this.isErrorRegister = true;
          this.errorMessageRegister = response.message;
        } else {
          this.isErrorRegister = false;
          this.statusLogin = true;
        }
        this.spinner.hide();
      },
    error => {
      this.spinner.hide();
      console.log(error);
      this.isErrorRegister = true;
      if (error != null) {
        this.errorMessage = error.error.message;
      }
    });
  }

  getToken(): any {
    this._userService.login(this.user, true).subscribe(
      response => {
        this.isError = false;
        this.token = response.token;
        if (!this.token) {
          this.isError = true;
          this.errorMessage = 'Error al conseguir el token';
        } else {
          // Persistir token del usuario
          localStorage.setItem('token', this.token);

          // Cambiamos la vista
          this._router.navigate(['main/home']);
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.isError = true;
        if (<any>error != null) {
          this.errorMessage = error.error.message;
        }
      });
  }

  public keyDownLogin(event, nombre: string, password: string) {
    if (event.keyCode === 13) {
       this.onSubmit();
    }
  }

}
