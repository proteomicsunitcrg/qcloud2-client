import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { MainFilesComponent } from '../files/main-files/main-files.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }, children: [
      { path: 'files', component: MainFilesComponent},
      // { path: 'guidesets', component: MainGuideSetComponent},
      // { path: 'instruments/:name', component: DataSourceComponent},
      // { path: 'systems', component: MainSystemComponent},
      // { path: 'thresholds', component: MainThresholdComponent}
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class IntranetRouterModule { }
