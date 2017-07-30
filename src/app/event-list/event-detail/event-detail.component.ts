import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { EventService } from './../event.service';
import { LookupService } from './../../services/lookup.service';
import { eventEnterLeaveAnimationTrigger } from '../../animations/eventAnimations';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  animations: [eventEnterLeaveAnimationTrigger]
})
export class EventDetailComponent implements OnInit {

  selectedEventState = 'in';

  constructor(
    private _ds: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    public eventService: EventService,
    public lookupService: LookupService
  ) {
    // This code is to display the correct event detail info when they directly type in the url
    if (this._route.snapshot.params['id']) {
      this.selectedEventState = 'in';
      if (!this.eventService.selectedEvent) {
        const id = this._route.snapshot.params['id'];
        this._ds.getEventById(id).then(
          (data) => {
            if (data.json().length) {
              this.eventService.selectedEvent = data.json()[0];
            }
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  ngOnInit() {
  }

  navigateToEventList() {
    this.selectedEventState = 'out';
    this._router.navigate(['/events']);
  }

}
