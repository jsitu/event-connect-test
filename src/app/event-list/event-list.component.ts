import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private _ds: DataService) { }

  ngOnInit() {
    this._ds.getEventList();
  }

}
