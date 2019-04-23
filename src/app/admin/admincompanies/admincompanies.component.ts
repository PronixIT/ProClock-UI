import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { addCompany } from '../../addcompany';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import{viewCompanyValues} from './adminviewcompanies';
import { AppserviceService } from '../../appservice.service';
import { Router } from '@angular/router';
import { updateCompany } from '../../updatecompany';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export class PeriodicElement {
  companyId: string;
  companyName: string;
  companyAddress: string;
  userId: number;
  action: string;
}

@Component({
  selector: 'app-admincompanies',
  templateUrl: './admincompanies.component.html',
  styleUrls: ['./admincompanies.component.scss']
})
export class AdmincompaniesComponent implements OnInit {
  viewcompaniesadmin: PeriodicElement;

  viewc = sessionStorage.getItem('userId');
  dashboardvaluse = this.appservice.rootUrl;
  companieslist: any;
  dataSource: any;
  displayedColumns: string[] = ['companyId', 'companyName', 'companyAddress', 'Action'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router, private appservice: AppserviceService) {

  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.companieslist);
    this.dataSource.data = this.companieslist;
    this.dataSource.paginator = this.paginator;
  }
  company = this.http.get(this.dashboardvaluse + '/proClock/viewCompanies/' + this.viewc).subscribe((res: Response) => {
    this.companieslist = res;

  });

  openDialog(): void {
    const dialogRef = this.dialog.open(AddnewcompanyComponent, {
      width: '450px',
    });
  }

  projectview(updatecompanyvalues: PeriodicElement) {
    this.viewcompaniesadmin = updatecompanyvalues;
    sessionStorage.setItem('companyId', updatecompanyvalues.companyId);
    sessionStorage.setItem('companyName', updatecompanyvalues.companyName);
    sessionStorage.setItem('companyAddress', updatecompanyvalues.companyAddress);
    this.appservice.viewProjects();
  };
  receipt(updatecompanyvalues: PeriodicElement) {
    this.viewcompaniesadmin = updatecompanyvalues;
    sessionStorage.setItem('companyId', updatecompanyvalues.companyId);
    sessionStorage.setItem('companyName', updatecompanyvalues.companyName);
    sessionStorage.setItem('companyAddress', updatecompanyvalues.companyAddress);
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(updatenewcompanyComponent, {
      width: '450px',
    });
  }
}



@Component({
  selector: 'addnewcompany-component',
  templateUrl: './addnewcompany-component.html',
  styleUrls: ['./admincompanies.component.scss']
})
export class AddnewcompanyComponent {
  addcompany: addCompany;
  constructor(
    public dialogRef: MatDialogRef<AddnewcompanyComponent>, private appservice: AppserviceService) { }
  ngOnInit() {
    this.appservice.viewCompaniesList;
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.addcompany = {
      companyName: '',
      companyAddress: '',
      userId: ''
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  OnSubmit(form: NgForm) {
    this.appservice.adminadddCompany(form.value).subscribe((res: any) => {
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

  refresh(): void {
    window.location.reload();
  }
}

@Component({
  selector: 'updatenewcompany-component',
  templateUrl: './updatenewcompany.component.html',
  styleUrls: ['./admincompanies.component.scss']
})

export class updatenewcompanyComponent {
  // viewcompaniesadmin:PeriodicElement;
  // viewCompanyValues:string;
  updatecompany: updateCompany;
  b = sessionStorage.getItem('companyName');
  c = sessionStorage.getItem('companyAddress');
  companyid = sessionStorage.getItem('companyId');
  admincompanyupdateuserid = sessionStorage.getItem('userId');

  constructor(
    public dialogRef: MatDialogRef<updatenewcompanyComponent>, private appservice: AppserviceService) { }
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
    var admincompanyupdateuserid = sessionStorage.getItem('userId');
    var companyid = sessionStorage.getItem('companyId');
    const updatecompany: updateCompany = {
      userId: +admincompanyupdateuserid,
      companyId: +companyid,
      companyName: form.value.companyName,
      companyAddress: form.value.companyAddress,
    }
    this.appservice.adminupdateCompany(updatecompany)
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