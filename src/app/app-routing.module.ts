import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './main/menu/menu.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ConfigComponent } from './main/config/config.component';
import { DataformComponent } from './main/dataform/dataform.component';
import { StatsComponent } from './main/stats/stats.component';
import { AccComponent } from './main/home/acc/acc.component';
import { AccDetailComponent } from './main/acc-detail/acc-detail.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {
    path: ':id',
    component: MainComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'config', component: ConfigComponent},
      {path: 'dataform', component: DataformComponent},
      {path: 'stats', component: StatsComponent},
      {path: 'acc-detail/:id', component: AccDetailComponent}
    ]
  },
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  MainComponent,
  MenuComponent,
  HomeComponent,
  ConfigComponent,
  DataformComponent,
  StatsComponent,
  AccComponent,
  AccDetailComponent
];
