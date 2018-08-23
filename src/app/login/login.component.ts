import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogginService } from '../loggin.service';
import { Usuario } from '../usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Usuario;
  constructor(private logginService: LogginService, private router: Router) { }


  ngOnInit() {
  }

  public loggear(nombre: string, password: string) {
    this.user = new Usuario(nombre, password);
    this.logginService.getAll(this.user.name, this.user.pass).subscribe(data => {
      if (data.id === 1) {
        this.router.navigate(['/home']);
      }
    });
  }

  public keyDownLogin(event, nombre: string, password: string) {
    if (event.keyCode === 13) {
      this.loggear(name, password);
    }
  }
}
