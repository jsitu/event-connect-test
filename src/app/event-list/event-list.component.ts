import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DataService } from './../services/data.service';
import { LookupService } from './../services/lookup.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: []
})
export class EventListComponent implements OnInit {

  events: any[];

  constructor(
    private _ds: DataService,
    private _route: ActivatedRoute,
    public lookupService: LookupService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(
      (data: Data) => {
        if (data && data['events']) {
          this.events = data['events'].json();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

}