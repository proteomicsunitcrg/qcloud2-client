import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainUserViewComponent } from '../user-view/main-user-view/main-user-view.component';
import { UserViewBuilderComponent } from '../user-view/user-view-builder/user-view-builder.component';
import { MainProfileComponent } from '../profile/main-profile/main-profile.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_USER' },
    children: [
      { path: 'views', component: MainUserViewComponent },
      { path: 'profile', component: MainProfileComponent },
      { path: 'builder', component: UserViewBuilderComponent },
      { path: 'builder/edit/:apiKey', component: UserViewBuilderComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class ConfigurationRouterModule { }
