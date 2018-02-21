import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../auth-guard.service';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { UsersComponent } from '../users/users.component';
import { DataSourceComponent } from '../data-source/data-source.component';

const routes: Routes = [
  {path: '', component: MainComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_MANAGER'}, children: [
    { path:'users',component: UsersComponent},
    { path:'instruments/:name', component: DataSourceComponent}
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ManagementRouterModule { }
