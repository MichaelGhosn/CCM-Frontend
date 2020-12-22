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
import {IDay} from '../../Models/User/IDay';
import {IPagination} from '../../Models/IPagination';
import {IAllReservations} from '../../Models/User/IAllReservations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }


  GetMapsOfOrganisation(organisationId: number): Observable<IResponseModel<Array<IMap>>> {
    return this.http.get<IResponseModel<Array<IMap>>>(this.authenticationService.backendApi + '/Maps/' + organisationId ,
      this.authenticationService.httpOptions);
  }

  GetMapOpeningTime(mapId: number): Observable<IResponseModel<Array<IOpeningTime>>> {
    return this.http.get<IResponseModel<Array<IOpeningTime>>>(this.authenticationService.backendApi + '/OpeningTimes/' + mapId,
      this.authenticationService.httpOptions);
  }

  GetMapSeats(mapId: number): Observable<IResponseModel<Array<ISeat>>> {
    return this.http.get<IResponseModel<Array<ISeat>>>(this.authenticationService.backendApi + '/Seats/' + mapId,
      this.authenticationService.httpOptions);
  }

  AddReservation(newReservation: IAddReservation): Observable<IResponseModel<string>> {
    return this.http.post<IResponseModel<string>>(this.authenticationService.backendApi + '/Reservations', newReservation,
        this.authenticationService.httpOptions);
  }

  GetDays(): Observable<IResponseModel<Array<IDay>>> {
    return this.http.get<IResponseModel<Array<IDay>>>(this.authenticationService.backendApi + '/Days',
        this.authenticationService.httpOptions);
  }

  GetReservationsHistory(userId: number, pagination: IPagination): Observable<IResponseModel<IAllReservations>> {
    return this.http.post<IResponseModel<IAllReservations>>(this.authenticationService.backendApi + '/Reservations/' + userId, pagination,
      this.authenticationService.httpOptions);
  }

  DeleteReservation(reservationId: number): Observable<IResponseModel<any>> {
    return this.http.delete<IResponseModel<any>>(this.authenticationService.backendApi + '/Reservations/' + reservationId,
      this.authenticationService.httpOptions);
  }

}
