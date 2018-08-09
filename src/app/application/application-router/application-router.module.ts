import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from '../main-window/main-window.component';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
// tslint:disable-next-line:max-line-length
import { DataVisualizationMainWindowComponent} from '../data-visualization/data-visualization-main-window/data-visualization-main-window.component';
import { WelcomeComponent } from '../layout/welcome/welcome.component';
const routes: Routes = [
  { path: '', component: MainWindowComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_USER'},
  children: [
    {path: '', component: WelcomeComponent},
    {path: 'administration', loadChildren: '../../administration/administration.module#AdministrationModule'},
    {path: 'management', loadChildren: '../../management/management.module#ManagementModule'},
    {path: 'statistics', loadChildren: '../../statistics/statistics.module#StatisticsModule'},
    {path: 'configuration', loadChildren: '../../configuration/configuration.module#ConfigurationModule' },
    {path: 'view/:type/:apiKey', component: DataVisualizationMainWindowComponent}
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
