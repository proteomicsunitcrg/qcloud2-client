import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../auth-guard.service';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { UsersComponent } from '../users/users.component';
import { DataSourceComponent } from '../data-source/data-source.component';
import { MainGuideSetComponent } from '../guide-set/main-guide-set/main-guide-set.component';
import { MainSystemComponent } from '../system/main-system/main-system.component';
import { MainThresholdComponent } from '../threshold/main-threshold/main-threshold.component';
import { CommunityLineMainComponent } from '../community-line/community-line-main/community-line-main.component'
const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_MANAGER'}, children: [
    { path: 'users', component: UsersComponent},
    { path: 'guidesets', component: MainGuideSetComponent},
    { path: 'instruments/:name', component: DataSourceComponent},
    { path: 'systems', component: MainSystemComponent},
    { path: 'thresholds', component: MainThresholdComponent},
    { path: 'community', component: CommunityLineMainComponent}
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
