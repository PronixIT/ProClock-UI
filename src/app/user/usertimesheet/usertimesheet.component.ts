import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userTimePost } from '../../usertime.post';
import { AppserviceService } from '../../appservice.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
export let username: string;
export interface Product {
  startDate: string;
  endDate: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  userId: string
}
@Component({
  selector: 'app-usertimesheet',
  templateUrl: './usertimesheet.component.html',
  styleUrls: ['./usertimesheet.component.scss']
})
export class UsertimesheetComponent {
  usertimepost: userTimePost;
  usertimeget: any;
  startDate: any;
  viewsheet: any;
  projectlist:any;
  selectedOption;
  dashboard = sessionStorage.getItem('userId');
  dashboardvaluse = this.appservice.rootUrl;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  constructor(private http: HttpClient, private router: Router, private appservice: AppserviceService, private modal: NgbModal) {
    this.viewsheet;
    this.dashboardvaluse;
  }
  headElements = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.usertimepost = {
      startDate: "",
      endDate: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      userId: "",
      projectId:''
    }

  }
  project = this.http.get(this.dashboardvaluse + '/proClock/getProjectlist/' + this.dashboard).subscribe((res: Response) => {
    this.projectlist = res;
  });
  selectedCompanyId() {
    sessionStorage.setItem('utprojectid', this.selectedOption.projectId);
    //alert(this.selectedOption.projectId);
  }

  OnSubmit(form: NgForm) {
    debugger;
    this.appservice.usertimeby(form.value).subscribe((res: any) => {
      this.resetForm();
      // console.log(res.string + JSON.stringify(res));
      //console.log(form.value.string);
      //this.resetForm();
      // console.log(res);
      // if(this.appservice.usertime.statusCode=="000"){ 
      // console.log(this.appservice.usertime.status);
      // }
      // else if(this.appservice.usertime.statusCode !=="000"){
      //   alert(this.appservice.usertime.statusMsg);

      // }
    });
  }
  //view: CalendarView = CalendarView.Day;
  view: CalendarView = CalendarView.Week;
  // view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  activeDayIsOpen: boolean = true;
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  viewList = this.http.get(this.dashboardvaluse + '/proClock/viewTimesheet/' + this.dashboard).subscribe((res: Response) => {
    this.viewsheet = res;
    this.router.navigate(['/usertimesheet']);
  });
  refresh(): void {
    window.location.reload();
  }
}





