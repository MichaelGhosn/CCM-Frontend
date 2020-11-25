import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../Authentication/authentication.service';
import {Observable} from 'rxjs';
import {IResponseModel} from '../../Models/IResponseModel';
import {IAddOrganisation} from '../../Models/Admin/IAddOrganisation';
import {IGetRoles} from '../../Models/Admin/IGetRoles';
import {IGetOrganisations} from '../../Models/Admin/IGetOrganisations';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authenticationNService: AuthenticationService) {}

  AddOrganisation(newOrganisation: IAddOrganisation): Observable<IResponseModel<string>> {
    return this.http.post<IResponseModel<string>>(this.authenticationNService.backendApi + '/Organisation',
      newOrganisation, this.authenticationNService.httpOptions);
  }

  GetOrganisations(): Observable<IResponseModel<Array<IGetOrganisations>>> {
    return this.http.get<IResponseModel<Array<IGetOrganisations>>>(this.authenticationNService.backendApi + '/Organisation',
      this.authenticationNService.httpOptions);
  }

  GetRoles(): Observable<IResponseModel<Array<IGetRoles>>> {
     return this.http.get<IResponseModel<Array<IGetRoles>>>(this.authenticationNService.backendApi + '/Role',
       this.authenticationNService.httpOptions);
  }



}
