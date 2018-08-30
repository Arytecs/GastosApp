import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {RouterModule, Routes} from '@angular/router';
=======
import { RouterModule, Routes } from '@angular/router';
>>>>>>> 43023fe17c7d91c55c780fccebab4cba520d487e
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './menu/home/home.component';
import { MenuComponent } from './menu/menu.component';

import { LogginService } from './loggin.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PruebaComponent } from './prueba/prueba.component';
import { ConfigComponent } from './menu/config/config.component';
import { DataComponent } from './menu/data/data.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'prueba', component: PruebaComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'add', component: DataComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    PruebaComponent,
    ConfigComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forChild(),
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule
  ],
  providers: [LogginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
