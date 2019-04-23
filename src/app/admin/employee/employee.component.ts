import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AppserviceService } from '../../appservice.service';
import { addEmployee } from '../../addemployee';
import { HttpClient } from '@angular/common/http';
import { addCompany } from 'src/app/addcompany';

export class PeriodicElement {
  companyId: string;
  companyName: string;
  companyAddress: string;
  userId: number;
  action: string;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  dashboardvaluse = this.appservice.rootUrl;
  dashboard = sessionStorage.getItem('userId');
  viewsheet: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'emailId', 'phoneNo', 'companyId', 'projectId', 'managerId', 'createdBy'];
  //dataSource = new MatTableDataSource<projectsedit>(this.projectlist);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, public dialog: MatDialog, private appservice: AppserviceService) {
    this.viewsheet;
    this.dashboardvaluse;
  }
  ngOnInit() {
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(addNewEmployee, {
      width: '450px',
    });
  }
  viewList = this.http.get(this.dashboardvaluse + '/proClock/viewEmployees/' + this.dashboard).subscribe((res: Response) => {
    this.viewsheet = res;
  });
}

@Component({
  selector: 'addnewnewemployee-component',
  templateUrl: './addnewemployee.cmponent.html',
  styleUrls: ['./employee.component.scss']
})
export class addNewEmployee {
  viewcompaniesadmin: PeriodicElement;
  companieslist: any;
  addemployee: addEmployee; projectboard: any;
  dashboardvaluse = this.appservice.rootUrl;
  companyboard = sessionStorage.getItem('userId');
  projectlist: any;
  managerlist: any;
  selectedOption1;
  selectedOption3;
  selectedOption2;
  projectfilterlist: any;
  constructor(private http: HttpClient, public dialogRef: MatDialogRef<addNewEmployee>, private appservice: AppserviceService) { }
  ngOnInit() {
    this.resetForm();
  }
  viewcompany = this.http.get(this.dashboardvaluse + '/proClock/viewCompanies/' + this.companyboard).subscribe((res: Response) => {
    debugger;
    this.companieslist = res;
  });
  selectedCompanyId() {
    this.http.get(this.dashboardvaluse + '/proClock/viewProjects/' + this.selectedOption1.companyId).subscribe((res: Response) => {
      this.projectlist = res;

    });

    sessionStorage.setItem('aecompanyid', this.selectedOption1.companyId);
  }

  selectedProjectId() {
    this.http.get(this.dashboardvaluse + '/proClock/viewManagers/' + this.selectedOption2.projectId).subscribe((res: Response) => {
      this.managerlist = res;
    });

    sessionStorage.setItem('aeprojectid', this.selectedOption2.projectId);
  }

  selectedmanagerId() {
    sessionStorage.setItem('aemanagerid', this.selectedOption3.managerId);
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.addemployee = {
      firstName: '',
      lastName: '',
      userName: '',
      emailId: '',
      phoneNo: '',
      companyId: '',
      projectId: '',
      managerId: '',
      createdBy: '',
    }
  }
  OnSubmit(form: NgForm) {
    debugger;
    this.appservice.adminadddemployee(form.value).subscribe((res: any) => {
      this.resetForm(form);
      // console.log(res);
      // if(this.appservice.signup.statusCode=="000"){ 
      //  var useridvalue = sessionStorage.getItem("userid")
      //   alert(this.appservice.signup.statusMsg);
      // }else if(this.appservice.signup.statusCode=="500"){
      //   alert(this.appservice.signup.statusMsg + "local server");


      // }
      // else if(this.appservice.signup.statusCode=="004"){
      //   alert(this.appservice.signup.statusMsg);

      // }
    });
  };
  onNoClick(): void {
    this.dialogRef.close();
  };
  refresh(): void {
    window.location.reload();
  };
}
