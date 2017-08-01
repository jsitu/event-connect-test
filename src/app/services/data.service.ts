import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(private _http: Http) { }

  getEventList(): Promise<any> {
    return this._http.get('/api/events').toPromise();
  };

  getEventById(id: string): Promise<any> {
    return this._http.get(`/api/events/${id}`).toPromise();
  };

  createAttendee(attendee: any): Promise<any> {
    return this._http.post('/api/users', attendee).toPromise();
  }

  createEventAttendeeAssociation(eventAttendee: any): Promise<any> {
    return this._http.post('/api/users/event', eventAttendee).toPromise();
  }

  createSessionAttendeeAssociation(sessionAttendee: any): Promise<any> {
    return this._http.post('/api/users/session', sessionAttendee).toPromise();
  }

}
