import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router/router';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable()
export class EventsResolver implements Resolve<any> {

    constructor(private _ds: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | any {
        return this._ds.getEventList();
    }
}