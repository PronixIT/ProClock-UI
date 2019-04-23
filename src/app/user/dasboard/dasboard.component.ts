import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { dashboardValues } from './dashboard';
import { AppserviceService } from '../../appservice.service';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class DasboardComponent implements OnInit {
  dashboard = sessionStorage.getItem('userId');
  dashboardvaluse = this.appservice.rootUrl;
  viewsheet: any;

  pipe: DatePipe;
  dashboardvalues: dashboardValues;
  myDate: any;
  dashboardviewList: any;
  constructor(private http: HttpClient, private _formBuilder: FormBuilder, private appservice: AppserviceService) {

  }

  ngOnInit() {

  }
  dash = this.http.get(this.dashboardvaluse + '/proClock/userDashboard/' + this.dashboard).subscribe((res: Response) => {
    this.dashboardviewList = res;
  });

  viewList = this.http.get(this.dashboardvaluse + '/proClock/viewTimesheet/' + this.dashboard).subscribe((res: Response) => {
    this.viewsheet = res;
  });
}
