import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdTooltipModule } from '@angular/material';
import { AppRouteModule } from './app.route';
import 'hammerjs';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-list/event-detail/event-detail.component';

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
    DateTimePipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouteModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdTooltipModule
  ],
  providers: [DataService, LookupService, EventsResolver, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
