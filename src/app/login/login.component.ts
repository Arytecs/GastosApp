import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogginService } from '../loggin.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  email: string;
  pass: string;

  constructor(private route: ActivatedRoute, private router: Router, /*private logginService: LogginService*/) {}

  ngOnInit() {
  }

  public loggear(email: string, password: string) {
    this.user = new User('', password, email, '');
    // this.logginService.getAll(this.user.email, this.user.pass).subscribe(
    //   response => {
    //     // if (data.id === 1) {
    //     //   this.router.navigate(['/home']);
    //     // }
    //     console.log(response.user);
    //     if (response.user) {
    //       this.router.navigate(['/main/home']);
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  public keyDownLogin(event, nombre: string, password: string) {
    if (event.keyCode === 13) {
      this.loggear(nombre, password);
    }
  }

}
