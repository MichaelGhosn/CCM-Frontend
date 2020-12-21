import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAddMap} from '../../Models/Recruiter/IAddMap';

import {Observable} from 'rxjs';
import {IResponseModel} from '../../Models/IResponseModel';
import {AuthenticationService} from '../Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}


  AddMap(newMap: IAddMap): Observable<IResponseModel<any>> {
      const formData = new FormData();

      Object.keys(newMap).forEach(key => {
        formData.append(key, newMap[key]);
      });

      return this.http.post<IResponseModel<any>>(this.authenticationService.backendApi + '/Map', formData);

  }

}
