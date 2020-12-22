import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../Authentication/authentication.service';
import {Observable} from 'rxjs';
import {IResponseModel} from '../../Models/IResponseModel';
import {IMap} from '../../Models/User/IMap';
import {environment} from '../../../environments/environment';
import {IOpeningTime} from '../../Models/User/IOpeningTime';
import {ISeat} from '../../Models/User/ISeat';
import {IAddReservation} from '../../Models/User/IAddReservation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }


  GetMapsOfOrganisation(organisationId: number): Observable<IResponseModel<Array<IMap>>> {
    return this.http.get<IResponseModel<Array<IMap>>>(environment.api + '/Map/' + organisationId ,
      this.authenticationService.httpOptions);
  }

  GetMapOpeningTime(mapId: number): Observable<IResponseModel<Array<IOpeningTime>>> {
    return this.http.get<IResponseModel<Array<IOpeningTime>>>(environment.api + '/OpeningTime/' + mapId,
      this.authenticationService.httpOptions);
  }

  GetMapSeats(mapId: number): Observable<IResponseModel<Array<ISeat>>> {
    return this.http.get<IResponseModel<Array<ISeat>>>(environment.api + '/Seat/' + mapId,
      this.authenticationService.httpOptions);
  }

  AddReservation(newReservation: IAddReservation): Observable<IResponseModel<string>> {
    console.log(newReservation);
    return this.http.post<IResponseModel<string>>(environment.api + '/Reservation', newReservation,
      this.authenticationService.httpOptions);
  }

}