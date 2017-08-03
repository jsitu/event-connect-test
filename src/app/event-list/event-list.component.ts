import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { LookupService } from './../services/lookup.service';
import { EventService } from './event.service';
import { eventEnterLeaveAnimationTrigger } from '../animations/event.animations';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  animations: [eventEnterLeaveAnimationTrigger]
})
export class EventListComponent implements OnInit {

  events: any[];
  allEventState = 'out';
  allEventLoadingState = 'in';

  constructor(
    private _ds: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    public eventService: EventService,
    public lookupService: LookupService
  ) {}

  ngOnInit() {
    this.allEventState = 'out';
    this.allEventLoadingState = 'in';

    this._route.data.subscribe(
      (data: Data) => {
        if (data && data['events']) {
          this.events = data['events'].json();
          this.allEventState = 'in';
          this.allEventLoadingState = 'out';
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

    const _this = this;
    setTimeout(function() {
      _this._router.navigate([`/events/${event.id}`]);
    }, 300);
  }

}
