import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './services/global';

@Injectable()
export class LogginService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAll(email: string, pass: string): Observable<any> {
    const params = JSON.stringify({ email, password: pass });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', params, { headers: headers });
  }
}
