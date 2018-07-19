import { Component, OnInit } from '@angular/core';
import { LogginService } from '../loggin.service'
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:Usuario;
  constructor(private logginService: LogginService) { }

  ngOnInit() {
  }

  public loggear(nombre:string, password:string){
    this.user = new Usuario(nombre, password)
    console.log(this.user);
    this.logginService.getAll(this.user.name, this.user.pass).subscribe(data => {
      console.log(data);
    });
  }

  public keyDownLogin(event, nombre:string, password:string){
    if(event.keyCode == 13) {
      this.loggear(name, password)
    }
  }
}
