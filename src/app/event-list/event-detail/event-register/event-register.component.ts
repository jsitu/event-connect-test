import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { EventService } from './../../event.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit {

  sessions: any[];
  isConfirmRegistrationInfoActive = false;

  constructor(
    public dialogRef: MdDialogRef<EventRegisterComponent>,
    public eventService: EventService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.isConfirmRegistrationInfoActive = false;
    this.sessions = this.data.sessions;
    if (this.sessions.length) {
      this.sessions.forEach(session => {
        session.isSelected = false;
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  back() {
    this.isConfirmRegistrationInfoActive = false;
  }

  confirmRegistrationInfo() {
    this.isConfirmRegistrationInfoActive = true;
  }

  completeRegistration() {
    this.dialogRef.close();
  }

}
