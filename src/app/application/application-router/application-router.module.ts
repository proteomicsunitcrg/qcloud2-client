import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from '../main-window/main-window.component';
import { Routes, RouterModule } from '@angular/router';
import { HolderComponent } from '../layout/holder/holder.component';
import { AuthGuardService as AuthGuard } from '../../auth-guard.service';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
const routes: Routes = [
  // { path: 'text', component: TextComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_MANAGER'}}
  { path: '', component: MainWindowComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_USER'},
  children: [
    {path:'', component: HolderComponent},
    {path:'administration', loadChildren: '../../administration/administration.module#AdministrationModule'},
    {path:'management', loadChildren: '../../management/management.module#ManagementModule'},
  ]},
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],

})
export class ApplicationRouterModule { }
