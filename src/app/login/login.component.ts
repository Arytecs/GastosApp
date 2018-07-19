import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginboton(){
    this.router.navigate(['/home']);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
