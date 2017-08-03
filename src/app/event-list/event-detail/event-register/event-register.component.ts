import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { EventService } from './../../event.service';
import * as _ from 'lodash';

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
  isRegistrationFailed = false;

  constructor(
    private _ds: DataService,
    private _formBuilder: FormBuilder,
    public dialogRef: MdDialogRef<EventRegisterComponent>,
    public eventService: EventService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {

    this.isConfirmRegistrationInfoActive = false;
    this.isRegistrationFormSubmitted = false;
    this.isRegistrationSuccessful = false;
    this.isRegistrationFailed = false;
    this.eventId = this.data.eventId;
    this.sessions = this.data.sessions;

    if (this.sessions.length) {
      this.sessions.forEach(session => {
        session.isSelected = false;
      });
    } else {
      this.isConfirmRegistrationInfoActive = true;
    }
  }

  ngOnInit() {
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

  refreshPage() {
    location.reload();
  }

  back() {
    this.isConfirmRegistrationInfoActive = false;
  }

  confirmRegistrationInfo() {
    this.isConfirmRegistrationInfoActive = true;
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
            // tslint:disable-next-line:no-shadowed-variable
            (res) => {
              console.log('Event Registration Success!');
              const selectedSessionCount = _.filter(this.sessions, (session) => {
                return session.isSelected === true;
              }).length;

              let selectedSessionRegistationSuccessCount = 0;
              if (selectedSessionCount > 0) {
                this.sessions.forEach(session => {
                  this._ds.createSessionAttendeeAssociation({
                    Attendee__c: attendeeId,
                    Session__c: session.Id
                  }).then(
                    // tslint:disable-next-line:no-shadowed-variable
                    (res) => {
                      console.log('Session Registration Success!');
                      selectedSessionRegistationSuccessCount++;

                      if (selectedSessionRegistationSuccessCount === selectedSessionCount) {
                        this.isRegistrationSuccessful = true;
                        // Update addendee active property here
                        this._ds.updateAttendeeById({
                          Id: attendeeId,
                          Active__c: true
                        }).then(
                          // tslint:disable-next-line:no-shadowed-variable
                          (res) => {
                            console.log('Attendee Updated.');
                          }
                        ).catch(
                          (err) => {
                            console.log(err);
                          }
                        );
                      }
                    }
                  ).catch(
                    (error) => {
                      this.isRegistrationFailed = true;
                      console.log(error);
                    }
                  );
                });
              } else {
                this.isRegistrationSuccessful = true;
                // Update addendee active property here
                this._ds.updateAttendeeById({
                  Id: attendeeId,
                  Active__c: true
                }).then(
                  // tslint:disable-next-line:no-shadowed-variable
                  (res) => {
                    console.log('Attendee Updated.');
                  }
                ).catch(
                  (err) => {
                    console.log(err);
                  }
                );
              }
            }
          ).catch(
            (error) => {
              console.log(error);
              this.isRegistrationFailed = true;
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
