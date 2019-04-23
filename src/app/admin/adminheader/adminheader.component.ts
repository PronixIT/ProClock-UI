import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss']
})
export class AdminheaderComponent implements OnInit {

  userids = sessionStorage.getItem("userId");
  firstname = sessionStorage.getItem("firstName");
  lastname = sessionStorage.getItem("lastName");
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    this.firstname;
    this.userids;
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/thumbup-icon.svg'));
  }

  ngOnInit() {

  }

  refresh(): void {
    // window.location.reload();
    this.router.navigate(['/login']);
  }

}
