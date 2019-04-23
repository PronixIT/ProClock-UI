import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './header/register/register.component';
import { LoginComponent } from './header/login/login.component';
import { ChangepasswordComponent } from './header/changepassword/changepassword.component';
import { UserheaderComponent } from './user/userheader/userheader.component';
import { HeaderComponent } from './header/header/header.component';
import { DasboardComponent } from './user/dasboard/dasboard.component';
import { UsertimesheetComponent } from './user/usertimesheet/usertimesheet.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { GeneratepasswordComponent } from './header/generatepassword/generatepassword.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { AdmincompaniesComponent } from './admin/admincompanies/admincompanies.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { ManagersComponent } from './admin/managers/managers.component';
import { EmployeeComponent } from './admin/employee/employee.component';
const routes: Routes = [
  {
    path: 'register', component: HeaderComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'login', component: HeaderComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'changepsd', component: HeaderComponent,
    children: [{ path: '', component: ChangepasswordComponent }]
  },

  {
    path: 'generatepsd', component: HeaderComponent,
    children: [{ path: '', component: GeneratepasswordComponent }]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'userhead', component: UserheaderComponent },

  {
    path: '', component: UserheaderComponent,
    children: [{ path: 'dashboard', component: DasboardComponent },
    { path: 'usertimesheet', component: UsertimesheetComponent },
    { path: 'userprofile', component: UserprofileComponent }
    ]
  },

  { path: 'adminhead', component: AdminheaderComponent },

  {
    path: '', component: AdminheaderComponent,
    children: [{ path: 'admindashboard', component: AdmindashboardComponent },
    { path: 'admincompanies', component: AdmincompaniesComponent },
    { path: 'project', component: ProjectsComponent },
    { path: 'manager', component: ManagersComponent },
    { path: 'employee', component: EmployeeComponent }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
