import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from '../main-window/main-window.component';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
// tslint:disable-next-line:max-line-length
import { DataVisualizationMainWindowComponent } from '../data-visualization/data-visualization-main-window/data-visualization-main-window.component';
import { WelcomeComponent } from '../layout/welcome/welcome.component';
const routes: Routes = [
  {
    path: '', component: MainWindowComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_USER' },
    children: [
      { path: '', component: WelcomeComponent },
      {
        path: 'administration', loadChildren: () => import('../../administration/administration.module')
          .then(m => m.AdministrationModule)
      },
      { path: 'management', loadChildren: () => import('../../management/management.module').then(m => m.ManagementModule) },
      { path: 'statistics', loadChildren: () => import('../../statistics/statistics.module').then(m => m.StatisticsModule) },
      { path: 'configuration', loadChildren: () => import('../../configuration/configuration.module').then(m => m.ConfigurationModule) },
      { path: 'help', loadChildren: () => import('../../help/help.module').then(m => m.HelpModule) },
      { path: 'view/:type/:apiKey', component: DataVisualizationMainWindowComponent }
    ]
  },
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
