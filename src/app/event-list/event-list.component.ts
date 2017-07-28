import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DataService } from './../services/data.service';
import { LookupService } from './../services/lookup.service';
import { eventEnterLeaveAnimationTrigger } from '../animations/eventAnimations';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [eventEnterLeaveAnimationTrigger]
})
export class EventListComponent implements OnInit {

  events: any[];
  allEventState = 'in';
  selectedEventState = 'out';
  selectedEvent: any;

  constructor(
    private _ds: DataService,
    private _route: ActivatedRoute,
    public lookupService: LookupService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(
      (data: Data) => {
        if (data && data['events']) {
          console.log(data['events'].json());
          this.events = data['events'].json();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openEventDetails(event) {
    if (event) {
      this.selectedEvent = event;
    }
    this.allEventState = 'out';
    this.selectedEventState = 'in';
  }

  closeEventDetails() {
    this.allEventState = 'in';
    this.selectedEventState = 'out';
  }

}
