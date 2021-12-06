import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { AppConst } from './app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  login(data: any): Observable<any> {
    return this.http.post(AppConst.LOGIN, data);
  }


}
