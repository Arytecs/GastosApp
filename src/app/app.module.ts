import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './menu/home/home.component';
import { MenuComponent } from './menu/menu.component';

import { LogginService } from 'src/app/loggin.service'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  {path: '', component:LoginComponent},
  {
    path: 'menu', 
    component:MenuComponent,
    children: [
      {path: '', component: HomeComponent}
    ]
  }
]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule

  ],
  providers: [LogginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
