import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainNonConformitiesComponent } from '../non-conformities/main-non-conformities/main-non-conformities.component';
import { MainComponent } from '../main/main.component';
import { AnnotationsMainComponent } from '../annotations/annotations-main/annotations-main.component';
import { ParettoComponent } from '../paretto/paretto.component';
import { AnnotationsBuilderComponent } from '../annotations/annotations-builder/annotations-builder.component';
import { SingleFileViewMainComponent } from '../single-file-view/single-file-view-main/single-file-view-main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_USER' },
    children: [
      { path: 'nonconformities', component: MainNonConformitiesComponent },
      { path: 'annotations', component: AnnotationsMainComponent },
      { path: 'annotations/builder/:apiKey', component: AnnotationsBuilderComponent},
      { path: 'pareto/:apiKey', component: ParettoComponent},
      { path: 'single-file/:checksum', component: SingleFileViewMainComponent}
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
