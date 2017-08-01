import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdTooltipModule, MdDialogModule } from '@angular/material';
import { AppRouteModule } from './app.route';
import 'hammerjs';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-list/event-detail/event-detail.component';
import { EventRegisterComponent } from './event-list/event-detail/event-register/event-register.component';

import { DataService } from './services/data.service';
import { LookupService } from './services/lookup.service';
import { EventService } from './event-list/event.service';

import { EventsResolver } from './resolvers/events.resolver';

import { DateTimePipe } from './pipes/date-time.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailComponent,
    EventRegisterComponent,
    DateTimePipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouteModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdTooltipModule,
    MdDialogModule
  ],
  entryComponents: [EventRegisterComponent],
  providers: [DataService, LookupService, EventsResolver, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
