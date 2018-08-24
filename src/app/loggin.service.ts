import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class LogginService {
  constructor(private http: HttpClient) {}

  getAll(name: string, pass: string): Observable<any> {
    return this.http.get('http://localhost:8080/greeting?name=' + name + '&pass=' + pass);
  }
}
