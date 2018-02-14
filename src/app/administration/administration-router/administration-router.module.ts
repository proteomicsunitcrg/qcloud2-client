import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../auth-guard.service';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { CategoryComponent } from '../category/category.component';


const routes: Routes = [
  //{ path: 'administration', component: MainComponent},
  {path: '', component: MainComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_ADMIN'},
  children: [
    {path: 'category', component: CategoryComponent}
  ]},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdministrationRouterModule { }
