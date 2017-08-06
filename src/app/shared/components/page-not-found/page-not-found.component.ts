import { LookupService } from './../../../services/lookup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    public lookupService: LookupService
  ) { }

  ngOnInit() {
  }

}
