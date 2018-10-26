import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
    public url: string;
    public identity: User;
    public token: string;
    public cateegory: Category;

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

    createCategory(category, token): Observable<any> {
        const params = JSON.stringify(category);
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.http.post(this.url + 'save-category', params, {headers: headers});
    }

    getCategories(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.http.get(this.url + 'get-categories/' + id, {headers: headers});
    }

    deleteCategory(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this.http.delete(this.url + 'delete-category/' + id, {headers: headers});
    }

}
