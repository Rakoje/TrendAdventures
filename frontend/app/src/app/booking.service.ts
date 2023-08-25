import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from './models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  reserve(reservation: Reservation){
    const data = {
      reservation: JSON.stringify(reservation)
    }
    
    return this.http.post(`${this.uri}/reserve`, data);
  }
}
