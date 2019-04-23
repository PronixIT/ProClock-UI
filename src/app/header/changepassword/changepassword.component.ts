import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { changePassword } from '../../user.password';
import { AppserviceService } from '../../appservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordvalue: changePassword;
  changepsd: any;
  constructor(private appservice: AppserviceService, private router: Router) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.changepasswordvalue = {
      newPassword: '',
      userId: '',
      oldPassword: ''
    }
  }
  OnChangePsd(form: NgForm) {
    this.appservice.ChangePassword(form.value).subscribe((res: any) => {
      //sessionStorage.setItem('userid',this.appservice.changepsd.userId);
      if (this.appservice.changepsd.statusCode = '000') {
        // console.log(this.appservice.changepsd.newPassword);
        //alert(this.appservice.changepsd.status);
        this.router.navigate(['/login']);
      }
      else {
        //alert(this.appservice.changepsd.statusMsg);
      }
    });
  }
}
