import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UserRegister } from './user.register';
import { changePassword } from './user.password';
import { generatePasswordInterface } from './generate.password';
import { userLogin } from './user.login';
import { userTimePost } from './usertime.post';
import { addCompany } from './addcompany';
import { addManager } from './addmanager';
import { addProject } from './addproject';
import { updateCompany } from './updatecompany';
import { updateProject } from './updateproject';
import { updateManager } from './updatemanager';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { addEmployee } from './addemployee';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  //readonly rootUrl: string = 'http://env-0687861.cloud.cms500.com';
  readonly rootUrl: string = 'http://192.168.2.37:1234';
  //readonly rootUrl: string = 'https://proclockwebapi.azurewebsites.net';

  constructor(private http: HttpClient, private router: Router) {
  }
  signup: any;
  changepsd: any;
  generatepsd: any;
  login: any;
  usertime: any;
  viewList: any;
  viewCompaniesList: any;
  viewProjectsList: any;
  viewManagersList: any;
  addcompanydetails: any;
  updatecompanydetails: any;
  addmanagerdetails: any;
  addprojectdetails: any;
  addemployeedetails: any;
  companyid: any;
  viewc: any;
  projectid: any;
  tableData: any;
  updateprojectdetails: any;
  updatemanagerdetails: any;
  registerUser(userregister: UserRegister) {
    const body: UserRegister = {
      firstName: userregister.firstName,
      lastName: userregister.lastName,
      userName: userregister.userName,
      emailId: userregister.emailId,
      phoneNo: userregister.phoneNo

    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/register', body, { headers: reqHeader })
      .map((res: any) => {
        this.signup = res;

      });
  }

  generatepasswords(generatepasswordinterface: generatePasswordInterface) {
    let useridvalue = sessionStorage.getItem('userId');
    console.log('generate psd' + sessionStorage.getItem('userId'));
    const body: generatePasswordInterface = {
      userId: useridvalue,
      newPassword: generatepasswordinterface.newPassword,
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/resetPassword', body, { headers: reqHeader })
      .map((res: any) => {
        this.generatepsd = res;
        console.log('generate psd' + res + this.generatepsd.newPassword + this.generatepsd.userId);
      });
  }

  ChangePassword(changepassword: changePassword) {
    let cahngeuserid = sessionStorage.getItem('userId');
    let oldPasswords = sessionStorage.getItem("usoldPassworderid");
    const body: changePassword = {
      userId: cahngeuserid,
      oldPassword: oldPasswords,
      newPassword: changepassword.newPassword,
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/changePassword', body, { headers: reqHeader })
      .map((res: any) => {
        this.changepsd = res;

      });
  }
  userloginby(userlogin: userLogin) {
    const body: userLogin = {
      emailId: userlogin.emailId,
      password: userlogin.password
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/login', body, { headers: reqHeader })
      .map((res: any) => {
        console.log('http content', res);
        this.login = res;


      });
  }

  usertimeby(usertimepost: userTimePost) {
    var useridvaluefrom = sessionStorage.getItem('userId');
    var utprojectid = sessionStorage.getItem('utprojectid');
    console.log(' user idd ' + useridvaluefrom)
    const body: userTimePost = {
      startDate: usertimepost.startDate,
      endDate: usertimepost.endDate,
      monday: usertimepost.monday,
      tuesday: usertimepost.tuesday,
      wednesday: usertimepost.wednesday,
      thursday: usertimepost.thursday,
      friday: usertimepost.friday,
      saturday: usertimepost.saturday,
      sunday: usertimepost.sunday,
      userId: useridvaluefrom,
      projectId:utprojectid

    }
    return this.http.post(this.rootUrl + '/proClock/updateTimesheet', body)
      .map((res: any) => {
        this.usertime = res;

      });
  }


  adminadddCompany(addcompany: addCompany) {
    var admincompanyadduserid = sessionStorage.getItem("userId");
    const body: addCompany = {
      userId: admincompanyadduserid,
      companyName: addcompany.companyName,
      companyAddress: addcompany.companyAddress
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/addCompany', body, { headers: reqHeader })
      .map((res: any) => {
        this.addcompanydetails = res;
      });
  }
  adminadddManager(addmanager: addManager) {
    
  debugger;
    var projectid = sessionStorage.getItem('projectId');
    var isauth = sessionStorage.getItem('isAuth');
    var isAuth: boolean = JSON.parse(isauth);
    const body: addManager = {
      managerName: addmanager.managerName,
      managerEmail: addmanager.managerEmail,
      isAuth: isAuth,
      projectId: projectid
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/addManager', body, { headers: reqHeader })
      .map((res: any) => {
        this.addmanagerdetails = res;
      });
  }
  adminadddProject(addproject: addProject) {
    var companyid = sessionStorage.getItem('companyId');
    const body: addProject = {
      projectName: addproject.projectName,
      projectCode: addproject.projectCode,
      projectVendor: addproject.projectVendor,
      projectStartDate: addproject.projectStartDate,
      projectDuration: addproject.projectDuration,
      description: addproject.description,
      companyId: companyid,
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/addProject', body, { headers: reqHeader })
      .map((res: any) => {
        this.addprojectdetails = res;
      });
  }
  adminadddemployee(addemployee: addEmployee) {
    var userid = sessionStorage.getItem("userId");
    var aecompanyid = sessionStorage.getItem('aecompanyid');
    var aeprojectid = sessionStorage.getItem('aeprojectid');
    var aemanagerid = sessionStorage.getItem('aemanagerid');
    const body: addEmployee = {
      firstName: addemployee.firstName,
      lastName: addemployee.lastName,
      userName: addemployee.userName,
      emailId: addemployee.emailId,
      phoneNo: addemployee.phoneNo,
      companyId: aecompanyid,
      projectId: aeprojectid,
      managerId: aemanagerid,
      createdBy: userid,
    }
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/addEmployee', body, { headers: reqHeader })
      .map((res: any) => {
        this.addemployeedetails = res;
      });
  }

  adminupdateCompany(updatecompany: updateCompany) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/updateCompany', updatecompany, { headers: reqHeader })
      .map((res: any) => {
        this.updatecompanydetails = res;
      });
  }

  adminupdateProject(updateproject: updateProject) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/updateProject', updateproject, { headers: reqHeader })
      .map((res: any) => {
        this.updateprojectdetails = res;
      });
  }
  adminupdateManager(updatemanager: updateManager) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/proClock/updateManager', updatemanager, { headers: reqHeader })
      .map((res: any) => {
        this.updatemanagerdetails = res;
      });
  }


  viewCompanies(): void {
    // this.viewc = sessionStorage.getItem('userId');
    // this.http.get(this.rootUrl +  '/proClock/viewCompanies/' + this.viewc).subscribe((res: Response) => {
    //this.viewCompaniesList = res; 
    this.router.navigate(['/admincompanies']);

    // });
  }
  viewProjects(): void {
    //this.companyid = +sessionStorage.getItem('companyId');
    //console.log("app service View Projects" + this.companyid);
    //this.http.get(this.rootUrl +  '/proClock/viewProjects/' + this.companyid).subscribe((res: Response) => {
    //this.viewProjectsList = res;
    this.router.navigate(['/project']);
    // console.log("app service View Projects" + res);

    //});
  }
  viewManagers(): void {
    // this.projectid = +sessionStorage.getItem('projectId');
    // console.log("app service View Projects" + this.projectid);
    // this.http.get(this.rootUrl +  '/proClock/viewManagers/' + this.projectid).subscribe((res: Response) => {
    //this.viewManagersList = res;
    this.router.navigate(['/manager']);//[routerLink]="'/manager'"
    // });
  }


  //  viewsheetdata(){
  //   this.tableData =  sessionStorage.getItem('userId');
  //   this.http.get(this.rootUrl +  '/proClock/viewTimesheet/' + this.tableData).subscribe((res: Response) => {
  //    this.viewList = res;
  //    this.router.navigate(['/usertimesheet']);
  // });
  //  }
}
