import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { addProject } from '../../addproject';
import { AppserviceService } from '../../appservice.service';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { updateProject } from '../../updateProject';
export interface projectsedit {
  projectId: string;
  projectName: string;
  projectCode: string;
  projectVendor: string;
  projectStartDate: string;
  projectDuration: string;
  description: string;
  action: string;
  companyName: string;
  companyAddress: string;
  companyId: string;
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  viewprojectsadmin: projectsedit;
  dataSource: any;
  projectlist: any;
  dashboardvaluse = this.appservice.rootUrl;
  companyid = +sessionStorage.getItem('companyId');
  b = sessionStorage.getItem('companyName');
  c = sessionStorage.getItem('companyAddress');
  displayedColumns: string[] = ['projectId', 'projectName', 'projectCode', 'projectVendor', 'projectStartDate', 'projectDuration', 'description', 'Action'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private appservice: AppserviceService) {
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<projectsedit>(this.projectlist);
    this.dataSource.data = this.projectlist;
    this.dataSource.paginator = this.paginator;
  }
  project = this.http.get(this.dashboardvaluse + '/proClock/viewProjects/' + this.companyid).subscribe((res: Response) => {
    this.projectlist = res;

  });
  managerview(viewcompanyvalues: projectsedit) {
    this.viewprojectsadmin = viewcompanyvalues;
    sessionStorage.setItem('projectId', viewcompanyvalues.projectId);
    sessionStorage.setItem('projectDuration', viewcompanyvalues.projectDuration);
    sessionStorage.setItem('projectName', viewcompanyvalues.projectName);
    sessionStorage.setItem('projectStartDate', viewcompanyvalues.projectStartDate);
    this.appservice.viewManagers();
  };
  receipt(updateprojectvalues: projectsedit) {
    this.viewprojectsadmin = updateprojectvalues;
    sessionStorage.setItem('projectId', updateprojectvalues.projectId);
    sessionStorage.setItem('projectName', updateprojectvalues.projectName);
    sessionStorage.setItem('projectStartDate', updateprojectvalues.projectStartDate);
    sessionStorage.setItem('projectDuration', updateprojectvalues.projectDuration);
    sessionStorage.setItem('projectVendor', updateprojectvalues.projectVendor);
    sessionStorage.setItem('projectCode', updateprojectvalues.projectVendor);
    sessionStorage.setItem('description', updateprojectvalues.description);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(Addnewproject, {
      width: '450px',
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(updatenewprojectComponent, {
      width: '450px',
    });
  }
}

@Component({
  selector: 'addnewproject-component',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./projects.component.scss']
})
export class Addnewproject {
  addproject: addProject;
  startDate = new Date(2018, 0, 1);
  constructor(public dialogRef: MatDialogRef<Addnewproject>, private appservice: AppserviceService) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.addproject = {
      projectName: '',
      projectCode: '',
      projectVendor: '',
      projectStartDate: '',
      projectDuration: '',
      description: '',
      companyId: ''
    }
  }
  OnSubmit(form: NgForm) {
    this.appservice.adminadddProject(form.value).subscribe((res: any) => {
      console.log('add Project' + res)
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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  refresh(): void {
    window.location.reload();
  }
}


@Component({
  selector: 'updatenewproject-component',
  templateUrl: './updatenewproject.component.html',
  styleUrls: ['./projects.component.scss']
})

export class updatenewprojectComponent {
  updateproject: updateProject;
  companyid = sessionStorage.getItem('companyId');
  projectid = sessionStorage.getItem('projectId');
  b = sessionStorage.getItem('projectName');
  c = sessionStorage.getItem('projectStartDate');
  d = sessionStorage.getItem('projectDuration');
  e = sessionStorage.getItem('projectVendor');
  f = sessionStorage.getItem('projectCode');
  g = sessionStorage.getItem('description');

  constructor(
    public dialogRef: MatDialogRef<updatenewprojectComponent>, private appservice: AppserviceService) { }
  ngOnInit() {
    //this.resetForm();


  }
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
    var companyid = sessionStorage.getItem('companyId');
    const updateproject: updateProject = {
      projectId: +projectid,
      companyId: +companyid,
      projectName: form.value.projectName,
      projectStartDate: form.value.projectStartDate,
      projectVendor: form.value.projectVendor,
      projectDuration: form.value.projectDuration,
      projectCode: form.value.projectCode,
      description: form.value.description,
    }
    this.appservice.adminupdateProject(updateproject)
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