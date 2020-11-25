import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../Authentication/authentication.service';
import {Observable} from 'rxjs';
import {IResponseModel} from '../../Models/IResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authenticationNService: AuthenticationService) {}

  AddCompany(newCompanyName: string): Observable<IResponseModel<string>> {
    return this.http.post<IResponseModel<string>>(this.authenticationNService.backendApi + '/Organisation', {
      name: newCompanyName
    }, this.authenticationNService.httpOptions);
  }

}
