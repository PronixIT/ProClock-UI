import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { addManager } from '../../addmanager';
import { AppserviceService } from '../../appservice.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { updateManager } from '../../updateManager';
export interface managersedit {
  managerId: string;
  managerName: string;
  managerEmail: string;
  auth: string;
  action: string;
  companyId: string;
  projectId: string;
}

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {
  viewmanagersadmin: managersedit;
  dashboardvaluse = this.appservice.rootUrl;
  projectid = +sessionStorage.getItem('projectId');
  managerlist: any;
  dataSource:any;
  // managerlist=this.appservice.viewManagersList;
  projectduration = sessionStorage.getItem('projectDuration');
  projectname = sessionStorage.getItem('projectName');
  projectstartDate = sessionStorage.getItem('projectStartDate');

  displayedColumns: any[] = ['managerId', 'managerName', 'managerEmail', 'projectVendor', 'auth', 'Action'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private appservice: AppserviceService) {
  }
  ngOnInit() { 
     this.dataSource = new MatTableDataSource<managersedit>(this.managerlist);
    this.dataSource.data = this.managerlist;
    this.dataSource.paginator = this.paginator;
  }

  manager = this.http.get(this.dashboardvaluse + '/proClock/viewManagers/' + this.projectid).subscribe((res: Response) => {
    this.managerlist = res;

  });
  employeeview(viewmanagervalues: managersedit) {
    this.viewmanagersadmin = viewmanagervalues;

    sessionStorage.setItem('managerId', viewmanagervalues.managerId);
    sessionStorage.setItem('managerName', viewmanagervalues.managerName);
    sessionStorage.setItem('managerEmail', viewmanagervalues.managerEmail);
    //this.appservice.viewManagers();
  };
  receipt(updatemanagervalues: managersedit) {
    this.viewmanagersadmin = updatemanagervalues;
    sessionStorage.setItem('managerId', updatemanagervalues.managerId);
    sessionStorage.setItem('managerName', updatemanagervalues.managerName);
    sessionStorage.setItem('managerEmail', updatemanagervalues.managerEmail);
    sessionStorage.setItem('isAuth', updatemanagervalues.auth);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Addnewmanager, {
      width: '450px',
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(updatenewmanagerComponent, {
      width: '450px',
    });
  }
}



@Component({
  selector: 'addnewmanager-component',
  templateUrl: './addnewmanagers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class Addnewmanager {
  addmanager: addManager;
  authValues = [
    { user: true, values: 0 },
    { user: false, values: 1 }
  ];
  constructor(
    public dialogRef: MatDialogRef<Addnewmanager>, private appservice: AppserviceService) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.addmanager = {
      managerName: '',
      managerEmail: '',
      isAuth: true || false,
      projectId: ''
    }
  }
  OnSubmit(form: NgForm) {
    
  debugger;
    this.appservice.adminadddManager(form.value).subscribe((res: any) => {
      this.resetForm(form);

      var value = form.value.isAuth
      sessionStorage.setItem('isAuth', value);

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
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  refresh(): void {
    window.location.reload();
  }
}


@Component({
  selector: 'updatenewmanager-component',
  templateUrl: './updatenewmanager.component.html',
  styleUrls: ['./managers.component.scss']
})

export class updatenewmanagerComponent {
  updatemanager: updateManager;
  companyid = sessionStorage.getItem('companyId');
  projectid = sessionStorage.getItem('projectId');
  managerid = sessionStorage.getItem('managerId');
  b = sessionStorage.getItem('managerName');
  c = sessionStorage.getItem('managerEmail');
  d = sessionStorage.getItem('isAuth');
  constructor(
    public dialogRef: MatDialogRef<updatenewmanagerComponent>, private appservice: AppserviceService) { }
  ngOnInit() {
    //this.resetForm();
  }
  upadateauthValues = [
    { user: "true", values: 1 },
    { user: "false", values: 0 }
  ];
  // resetForm(form?: NgForm) {
  //   if (form != null)
  //     form.reset();
  //   this.updatecompany = {
  //     id:+'',
  //     companyName: '',
  //     companyAddress: ''
  //   }
  // }

  onSubmitUpdate(form: NgForm) {
    var projectid = sessionStorage.getItem('projectId');
    var managerid = sessionStorage.getItem('managerId');
    console.log(sessionStorage.getItem('managerId'));
    if (form.value.user == 'false') {
      var x: boolean = form.value.values
    } else if (form.value.user == 'true') {
      var x: boolean = form.value.values
    }
    const updatemanager: updateManager = {
      managerName: form.value.managerName,
      managerEmail: form.value.managerEmail,
      isAuth: x,
      projectId: +projectid,
      managerId: +managerid,
    }
    this.appservice.adminupdateManager(updatemanager)
      .subscribe((res: any) => {
      })
  }

  updateClick(): void {
    this.dialogRef.close();
  }
  refresh(): void {
    window.location.reload();
  }
}