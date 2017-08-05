import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { EventService } from './../../event.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit {

  @ViewChild('attendeeFirstName') attendeeFirstName: ElementRef;
  eventId: string;
  eventTitle: string;
  eventStartDate: string;
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
    this.eventTitle = this.data.eventTitle;
    this.eventStartDate = this.data.eventStartDate;
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

    const EventStartDate = moment(this.eventStartDate).format('ddd, MMM D h:mm A');
    let mailBody = '<p><strong>' + this.eventTitle + '</strong> - ' + EventStartDate + '</p>';

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
              let selectedSessions = _.filter(this.sessions, (session) => {
                return session.isSelected === true;
              });

              let selectedSessionRegistationSuccessCount = 0;
              if (selectedSessions.length > 0) {
                mailBody = mailBody.concat('<ul>');
                selectedSessions = _.sortBy(selectedSessions, ['Start__c']);
                selectedSessions.forEach(session => {
                  this._ds.createSessionAttendeeAssociation({
                    Attendee__c: attendeeId,
                    Session__c: session.Id
                  }).then(
                    // tslint:disable-next-line:no-shadowed-variable
                    (res) => {
                      console.log('Session Registration Success!');
                      selectedSessionRegistationSuccessCount++;

                      // tslint:disable-next-line:max-line-length
                      mailBody = mailBody.concat('<li>' + session.Title__c + ' - ' + moment(session.Start__c).format('ddd, MMM D h:mm A') + '</li>');

                      if (selectedSessionRegistationSuccessCount === selectedSessions.length) {
                        mailBody = mailBody.concat('</ul>');

                        this.isRegistrationSuccessful = true;
                        this._ds.createMailer({
                          Recipient_Name__c: attendee.Name,
                          Recipient_Email__c: attendee.Email__c,
                          Mail_Body__c: mailBody
                        }).then(
                          // tslint:disable-next-line:no-shadowed-variable
                          (res) => console.log(res)
                        ).catch(
                          (err) => console.log(err)
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

                this._ds.createMailer({
                  Recipient_Name__c: attendee.Name,
                  Recipient_Email__c: attendee.Email__c,
                  Mail_Body__c: mailBody
                }).then(
                  // tslint:disable-next-line:no-shadowed-variable
                  (res) => console.log(res)
                ).catch(
                  (err) => console.log(err)
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
