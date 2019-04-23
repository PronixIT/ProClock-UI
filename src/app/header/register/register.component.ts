import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRegister } from '../../user.register';
import { AppserviceService } from '../../appservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userregister: UserRegister;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  signup: any;
  constructor(private appservice: AppserviceService, private router: Router) { }
  options = [
    { user: "1", value: 1 },
    { user: "2", value: 2 }
  ]
  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.userregister = {
      firstName: '',
      lastName: '',
      userName: '',
      emailId: '',
      phoneNo: ''
    }
  }
  OnSubmit(form: NgForm) {
    this.appservice.registerUser(form.value).subscribe((res: any) => {
      if (this.appservice.signup.statusCode == "000") {
        sessionStorage.setItem('userId', this.appservice.signup.userDetails.userId);
        this.resetForm(form);
        this.router.navigate(['/generatepsd']);
      } else if (this.appservice.signup.statusCode == "500") {
        alert(this.appservice.signup.statusMsg + "local server");
      }
      else if (this.appservice.signup.statusCode == "004") {
        alert(this.appservice.signup.statusRes);
      }
    });
  }
}
