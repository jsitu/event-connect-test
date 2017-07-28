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

import { DataService } from './services/data.service';
import { EventsResolver } from './resolvers/events.resolver';
import { DateTimePipe } from './pipes/date-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    DateTimePipe
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
  providers: [DataService, EventsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
