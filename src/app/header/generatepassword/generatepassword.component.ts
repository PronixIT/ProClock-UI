import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { generatePasswordInterface } from '../../generate.password';
import { AppserviceService } from '../../appservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-generatepassword',
  templateUrl: './generatepassword.component.html',
  styleUrls: ['./generatepassword.component.scss']
})
export class GeneratepasswordComponent implements OnInit {
  generatepassword: generatePasswordInterface;
  changepsd: any;
  constructor(private appservice: AppserviceService, private router: Router) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.generatepassword = {
      newPassword: '',
      userId: '',
    }
  }
  onGeneratePsd(form: NgForm) {
    this.appservice.generatepasswords(form.value).subscribe((res: any) => {
      if (this.appservice.generatepsd.statusCode = "000") {

        console.log('generate component' + sessionStorage.getItem('userId'));
        this.router.navigate(['/login']);
      }
      else {
        // alert(this.appservice.generatepsd.statusMsg);
      }
    });
  }

}
