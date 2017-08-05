import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DataService } from './../../services/data.service';
import { EventService } from './../event.service';
import { LookupService } from './../../services/lookup.service';
import { MapService } from './../../services/map.service';
import { eventEnterLeaveAnimationTrigger } from '../../animations/event.animations';
import { EventRegisterComponent } from './event-register/event-register.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  animations: [eventEnterLeaveAnimationTrigger]
})
export class EventDetailComponent implements OnInit {

  selectedEventState = 'in';
  isMapActive = false;

  lat: number;
  lng: number;
  geoLink: string;

  constructor(
    private _ds: DataService,
    private _map: MapService,
    private _route: ActivatedRoute,
    private _router: Router,
    public eventRegisterDialog: MdDialog,
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
              this.getEventLocationMap();
            }
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.getEventLocationMap();
      }
    }
  }

  ngOnInit() {
  }

  navigateToEventList() {
    this.selectedEventState = 'out';
    this._router.navigate(['/events']);
  }

  openEventRegisterDialog(event: any) {
    let sessions: any;
    if (this.eventService.selectedEvent.sessions__r && this.eventService.selectedEvent.sessions__r.records) {
      sessions = this.eventService.selectedEvent.sessions__r.records;
    }

    const dialogRef = this.eventRegisterDialog.open(EventRegisterComponent, {
      data: {
        eventId: this.eventService.selectedEvent.id,
        eventTitle: this.eventService.selectedEvent.title__c,
        eventStartDate: this.eventService.selectedEvent.start__c,
        sessions: sessions ? sessions : []
      }
    });
  }

  getEventLocationMap() {
    this._map.findFromAddress(
      this.eventService.selectedEvent.address__c,
      this.eventService.selectedEvent.city__c,
      this.eventService.selectedEvent.state__c,
      this.eventService.selectedEvent.zip__c
    ).subscribe(response => {
          if (response.status === 'OK') {
              this.lat = response.results[0].geometry.location.lat;
              this.lng = response.results[0].geometry.location.lng;
              this.geoLink = `http://maps.apple.com/?q=${this.lat},${this.lng}`;
              this.isMapActive = true;
          } else if (response.status === 'ZERO_RESULTS') {
              console.log('geocodingAPIService', 'ZERO_RESULTS', response.status);
              this.isMapActive = false;
          } else {
              console.log('geocodingAPIService', 'Other error', response.status);
              this.isMapActive = false;
          }
      }
    );
  }

}
