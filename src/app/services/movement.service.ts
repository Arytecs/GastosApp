import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user.model';
import { Account } from '../models/account.model';
import { Movement } from '../models/movement.model';

@Injectable()
export class MovementService {
    public url: string;
    public identity: User;
    public token: string;
    public movement: Movement;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    getIdentity() {
        const identity = JSON.parse(localStorage.getItem('identity'));

        if (identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('token');

        if (token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    createMovement(movement, token): Observable<any> {
        const params = JSON.stringify(movement);
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.http.post(this.url + 'save-movement', params, {headers: headers});
    }

    getMovements(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.http.get(this.url + 'movements/' + id, {headers: headers});
    }

    updateAccount(token, account): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        const params = account;

        return this.http.put(this.url + 'update-acc/', params, {headers: headers});
    }

    deleteAccount(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.http.delete(this.url + '/delete-acc/' + id, {headers: headers});
    }

}
