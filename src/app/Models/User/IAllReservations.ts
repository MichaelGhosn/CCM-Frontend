import {IReservation} from './IReservation';
import {IPagination} from '../IPagination';

export interface IAllReservations extends IPagination {
  reservations: Array<IReservation>;
  totalItemCount: number;
}
