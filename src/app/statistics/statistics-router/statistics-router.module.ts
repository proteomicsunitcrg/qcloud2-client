import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainNonConformitiesComponent } from '../non-conformities/main-non-conformities/main-non-conformities.component';
import { MainComponent } from '../main/main.component';
import { AnnotationsMainComponent } from '../annotations/annotations-main/annotations-main.component';
import { ParettoComponent } from '../paretto/paretto.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_USER' },
    children: [
      { path: 'nonconformities', component: MainNonConformitiesComponent },
      { path: 'annotations', component: AnnotationsMainComponent },
      { path: 'pareto', component: ParettoComponent}

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
export class StatisticsRouterModule { }
