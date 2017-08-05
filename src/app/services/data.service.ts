import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
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
  };

  updateAttendeeById(attendee: any): Promise<any> {
    return this._http.put(`/api/users/${attendee.Id}`, attendee).toPromise();
  };

  checkAttendeeUniqueness(attendee: any): Promise<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('name', attendee.Name);
    params.set('email', attendee.Email__c);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this._http.get('/api/users', requestOptions).toPromise();
  }

  createEventAttendeeAssociation(eventAttendee: any): Promise<any> {
    return this._http.post('/api/users/event', eventAttendee).toPromise();
  };

  createSessionAttendeeAssociation(sessionAttendee: any): Promise<any> {
    return this._http.post('/api/users/session', sessionAttendee).toPromise();
  };

  createMailer(mailer: any): Promise<any> {
    return this._http.post('/api/mailers', mailer).toPromise();
  }

}
