import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../Authentication/authentication.service';
import {Observable} from 'rxjs';
import {IResponseModel} from '../../Models/IResponseModel';
import {IAddOrganisation} from '../../Models/Admin/IAddOrganisation';
import {IGetRole} from '../../Models/Admin/IGetRole';
import {IGetOrganisation} from '../../Models/Admin/IGetOrganisation';
import {IAddUser} from '../../Models/Admin/IAddUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  AddOrganisation(newOrganisation: IAddOrganisation): Observable<IResponseModel<string>> {
    return this.http.post<IResponseModel<string>>(this.authenticationService.backendApi + '/Organisation',
      newOrganisation, this.authenticationService.httpOptions);
  }

  GetOrganisations(): Observable<IResponseModel<Array<IGetOrganisation>>> {
    return this.http.get<IResponseModel<Array<IGetOrganisation>>>(this.authenticationService.backendApi + '/Organisation',
      this.authenticationService.httpOptions);
  }

  GetRoles(): Observable<IResponseModel<Array<IGetRole>>> {
     return this.http.get<IResponseModel<Array<IGetRole>>>(this.authenticationService.backendApi + '/Role',
       this.authenticationService.httpOptions);
  }

  AddUser(newUser: IAddUser): Observable<IResponseModel<string>> {
    return this.http.post<IResponseModel<string>>(this.authenticationService.backendApi + '/User', newUser,
      this.authenticationService.httpOptions);
  }



}
