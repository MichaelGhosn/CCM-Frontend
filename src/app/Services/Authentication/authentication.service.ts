import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ILoginForm} from '../../Models/Authentication/ILoginForm';
import {IResponseModel} from '../../Models/IResponseModel';
import {IAuthenticated} from '../../Models/Authentication/IAuthenticated';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  backendApi = environment.api;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  Authenticate(credentials: ILoginForm): Observable<IResponseModel<IAuthenticated>> {
      return this.http.post<IResponseModel<IAuthenticated>>(this.backendApi + '/User/authenticate', credentials, this.httpOptions);
  }

}
