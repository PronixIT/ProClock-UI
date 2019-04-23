import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userLogin } from '../../user.login';
import { AppserviceService } from '../../appservice.service';
import { Router } from '@angular/router';
export let username: string;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userlogin: userLogin;
  constructor(private appservice: AppserviceService, private router: Router) { }
  ngOnInit() {
  }
  OnSubmit(form: NgForm) {
    this.appservice.userloginby(form.value).subscribe((res: any) => {
      username = form.value.emailId;
      if (this.appservice.login.statusCode == '000') {
        if (this.appservice.login.userRole == 'Admin') {
          this.router.navigate(['/adminhead']);
          this.router.navigate(['/admindashboard']);
          sessionStorage.setItem('userId', this.appservice.login.userDetails.userId);
          sessionStorage.setItem('firstName', this.appservice.login.userDetails.firstName);
          sessionStorage.setItem('lastName', this.appservice.login.userDetails.lastName);
          console.log(res);
        } else if (this.appservice.login.userRole == 'Employee') {
          this.router.navigate(['/userhead']);
          this.router.navigate(['/dashboard']);
          sessionStorage.setItem('userId', this.appservice.login.userDetails.userId);
          sessionStorage.setItem('firstName', this.appservice.login.userDetails.firstName);
          sessionStorage.setItem('lastName', this.appservice.login.userDetails.lastName);
          console.log(res);
        }
      }
      else {
        alert(this.appservice.login.statusMsg);
      }
    });
  }

}
