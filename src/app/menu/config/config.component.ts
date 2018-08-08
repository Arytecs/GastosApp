import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  public account: Account;
  public accounts: Account[] = [];
  
  AddAccount(accountName: string){
    this.account= new Account(accountName);
    this.accounts.push(this.account);
  }
  
  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

}
