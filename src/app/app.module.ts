import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdTooltipModule, MdDialogModule } from '@angular/material';
import { AppRouteModule } from './app.route';
import { AgmCoreModule } from '@agm/core';
import { TextMaskModule } from 'angular2-text-mask';
import { ShareModule } from 'ng2share/share.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-list/event-detail/event-detail.component';
import { EventRegisterComponent } from './event-list/event-detail/event-register/event-register.component';

import { DataService } from './services/data.service';
import { HelperService } from './services/helper.service';
import { LookupService } from './services/lookup.service';
import { EventService } from './event-list/event.service';
import { MapService } from './services/map.service';

import { EventsResolver } from './resolvers/events.resolver';

import { DateTimePipe } from './pipes/date-time.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
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
    MdDialogModule,
    TextMaskModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWCZ6J10f19dknhZksZPLYGzoGT1pwSbU'
    }),
    ShareModule
  ],
  entryComponents: [EventRegisterComponent],
  providers: [
    DataService,
    HelperService,
    LookupService,
    EventsResolver,
    EventService,
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
