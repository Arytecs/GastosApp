import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user.model';

@Injectable()
export class AccountService {
    public identity;
    public token;
    public url;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    prueba(): Observable<any> {

        return this.http.get(this.url + 'prueba');
    }
}
