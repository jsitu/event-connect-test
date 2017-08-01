import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { EventService } from './../../event.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit {

  @ViewChild('attendeeFirstName') attendeeFirstName: ElementRef;
  eventId: string;
  sessions: any[];
  isConfirmRegistrationInfoActive = false;
  registrationForm: FormGroup;
  isRegistrationFormSubmitted = false;
  isRegistrationSuccessful = false;

  constructor(
    private _ds: DataService,
    private _formBuilder: FormBuilder,
    public dialogRef: MdDialogRef<EventRegisterComponent>,
    public eventService: EventService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.isConfirmRegistrationInfoActive = false;
    this.isRegistrationFormSubmitted = false;
    this.isRegistrationSuccessful = false;
    this.eventId = this.data.eventId;
    this.sessions = this.data.sessions;

    if (this.sessions.length) {
      this.sessions.forEach(session => {
        session.isSelected = false;
      });
    };

    this.registrationForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ''
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  back() {
    this.isConfirmRegistrationInfoActive = false;
  }

  confirmRegistrationInfo() {
    this.isConfirmRegistrationInfoActive = true;
    this.attendeeFirstName.nativeElement.focus();
  }

  onRegistrationFormSubmit() {
    this.isRegistrationFormSubmitted = true;

    const attendee = {
      Name: `${this.registrationForm.value.firstName} ${this.registrationForm.value.lastName}`,
      Phone__c: this.registrationForm.value.phone,
      Email__c: this.registrationForm.value.email,
      Company__c: this.registrationForm.value.company
    };

    this._ds.createAttendee(attendee).then(
      (res) => {
        if (res.json().id) {
          const attendeeId = res.json().id;
          this._ds.createEventAttendeeAssociation({
            Attendee__c: attendeeId,
            Event__c: this.eventId
          }).then(
            (response) => {
              console.log(response);
              this.isRegistrationSuccessful = true;
            }
          ).catch(
            (error) => {
              console.log(error);
            }
          );
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

}
