import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth-guard.service';
import { RoleGuardService as RoleGuard } from '../role-guard.service';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},  
  { path: 'login', loadChildren: '../entry-point/entry-point.module#EntryPointModule'},  
  { path:'**', redirectTo: '/login', pathMatch: 'full'}  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
