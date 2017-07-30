import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { LookupService } from './../services/lookup.service';
import { EventService } from './event.service';
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

  constructor(
    private _ds: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    public eventService: EventService,
    public lookupService: LookupService
  ) {
    this.allEventState = 'in';
  }

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

  navigateToEventDetail(event) {
    if (event) {
      this.eventService.selectedEvent = event;
    }
    this.allEventState = 'out';
    this._router.navigate([`/events/${event.event_id__c}`]);
  }

}
