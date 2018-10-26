import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    public url: string;
    public identity: User;
    public token: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    login(user: User, isToken = null): Observable<any> {
        if (isToken != null) {
            user.isToken = isToken;
        }

        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url + 'login', params, { headers: headers });
    }

    register(user: User): Observable<any> {
        const params = JSON.stringify(user);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(this.url + 'register', params, { headers: headers });
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

    setImg(user: User): Observable<any> {
        const params = JSON.stringify(user);
        const clientHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this.http.post(this.url + '/upload-image-user/' + user._id , params, {headers: clientHeaders});
    }
}
