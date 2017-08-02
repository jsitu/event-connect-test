import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapService {
  API_KEY: string;
  API_URL: string;

  constructor(private http: Http) {
    this.API_KEY = 'AIzaSyAWCZ6J10f19dknhZksZPLYGzoGT1pwSbU';
    this.API_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}&address=`;
  }

  findFromAddress(address: string, city: string, state: string, zip?: string): Observable<any> {
      const compositeAddress = [address];

      if (city) compositeAddress.push(city);
      if (state) compositeAddress.push(state);
      if (zip) compositeAddress.push(zip);

      const url = `${this.API_URL}${compositeAddress.join(',')}`;

      return this.http.get(url).map(response => <any> response.json());
  }

}
