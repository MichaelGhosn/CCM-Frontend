import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IAddMap} from '../../Models/Management/IAddMap';

import {Observable} from 'rxjs';
import {IResponseModel} from '../../Models/IResponseModel';
import {AuthenticationService} from '../Authentication/authentication.service';
import {IAddOpeningTime} from '../../Models/Management/IAddOpeningTime';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}


  AddMap(newMap: IAddMap): Observable<IResponseModel<{mapId: number}>> {
      const formData = new FormData();

      Object.keys(newMap).forEach(key => {
        formData.append(key, newMap[key]);
      });

      return this.http.post<IResponseModel<{ mapId: number }>>(this.authenticationService.backendApi + '/Maps', formData);

  }

  AddSeats(seats: Array<{mapId: number, name: string}>): Observable<IResponseModel<any>> {
    return this.http.post<IResponseModel<any>>(this.authenticationService.backendApi + '/Seats/multiple', {
      seats
    }, this.authenticationService.httpOptions);
  }

  AddOpeningTIme(openingTime: IAddOpeningTime): Observable<IResponseModel<any>> {
    return this.http.post<IResponseModel<any>>(this.authenticationService.backendApi + '/OpeningTimes', openingTime,
      this.authenticationService.httpOptions);
  }

}
