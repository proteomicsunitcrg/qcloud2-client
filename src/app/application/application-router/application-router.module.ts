import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from '../main-window/main-window.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../auth-guard.service';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { DataVisualizationMainWindowComponent} from '../data-visualization/data-visualization-main-window/data-visualization-main-window.component';
const routes: Routes = [
  // { path: 'text', component: TextComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_MANAGER'}}
  { path: '', component: MainWindowComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_USER'},
  children: [
    {path:'', component: DataVisualizationMainWindowComponent},
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
