import { Injectable } from '@angular/core';

@Injectable()
export class EventService {

  selectedEvent: any;

  constructor() { }

  isEventDraft(event: any) {
    if (event && event.status__c.toLowerCase().trim() === 'draft') {
      return true;
    }

    return false;
  }

  isEventOpen(event: any) {
    if (event && event.status__c.toLowerCase().trim() === 'open') {
      return true;
    }

    return false;
  }

  isEventSoldOut(event: any) {
    if (event && event.status__c.toLowerCase().trim() === 'sold out') {
      return true;
    }

    return false;
  }

  isEventClosed(event: any) {
    if (event && event.status__c.toLowerCase().trim() === 'closed') {
      return true;
    }

    return false;
  }

  isEventSessionDraft(session: any) {
    if (session && session.Status__c.toLowerCase().trim() === 'draft') {
      return true;
    }

    return false;
  }

  isEventSessionOpen(session: any) {
    if (session && session.Status__c.toLowerCase().trim() === 'open') {
      return true;
    }

    return false;
  }

  isEventSessionSoldOut(session: any) {
    if (session && session.Status__c.toLowerCase().trim() === 'sold out') {
      return true;
    }

    return false;
  }

  isEventSessionClosed(session: any) {
    if (session && session.Status__c.toLowerCase().trim() === 'closed') {
      return true;
    }

    return false;
  }

}
