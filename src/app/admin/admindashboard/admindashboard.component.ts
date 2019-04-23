import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AppserviceService } from '../../appservice.service';
export interface PeriodicElement {
  companyName: string;
  employeeName: string;
  joiningDate: number;
  noOfWeeks: string;
  userId:number
}
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  
  viewc = sessionStorage.getItem('userId');
  dashboardvaluse = this.appservice.rootUrl;
  userstatus:any;
  managerstatus:any;
 // displayedColumns: string[] = ['Id', 'Name', 'Weeks', 'Action'];
 // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
 constructor(private http: HttpClient, private appservice: AppserviceService) {

}
 // @ViewChild(MatPaginator) paginator: MatPaginator;

 // @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
  }
  user = this.http.get(this.dashboardvaluse + '/proClock/userStatusReport/' + this.viewc).subscribe((res: Response) => {
    this.userstatus = res;
  });
  
  manager = this.http.get(this.dashboardvaluse + '/proClock/managerStatusReport/' + this.viewc).subscribe((res: Response) => {
    this.managerstatus = res;
  });
}



