import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { CategoryComponent } from '../category/category.component';
import { MainCvComponent } from '../cv/main-cv/main-cv.component';
import { MainContextSourceComponent } from '../context-source/main-context-source/main-context-source.component';
import { MainParametersComponent } from '../parameters/main-parameters/main-parameters.component';
import { MainSampleTypeComponent } from '../sample-type/main-sample-type/main-sample-type.component';
import { MainChartComponent } from '../charts/main-chart/main-chart.component';
import { MainDefaultViewComponent } from '../default-view/main-default-view/main-default-view.component';
import { DefaultViewGeneratorComponent } from '../default-view/default-view-generator/default-view-generator.component';
import { SampleTypeCategoryComponent } from '../sample-type-category/sample-type-category.component';
import { MainThresholdComponent } from '../threshold/main-threshold/main-threshold.component';
import { MainGuideSetComponent } from '../guideSet/main-guide-set/main-guide-set.component';
import { MainColorManagementComponent } from '../colorManagement/main-color-management/main-color-management.component';
import { MainNonConformitiesComponent } from '../nonconformities/main-non-conformities/main-non-conformities.component';
import { MessageComponent } from '../message/message.component';
import { EmailComponent } from '../email/email.component';
import { CommunityLineMainComponent } from '../community-line/community-line-main/community-line-main.component';
import { CommunityPartnerMainComponent } from '../community-partner/community-partner-main/community-partner-main.component';
import { GeneralAnnotationsMainComponent } from '../general-annotations/general-annotations-main/general-annotations-main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' },
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'cvs', component: MainCvComponent },
      { path: 'context', component: MainContextSourceComponent },
      { path: 'parameters', component: MainParametersComponent },
      { path: 'sampletypecategories', component: SampleTypeCategoryComponent },
      { path: 'sampletypes', component: MainSampleTypeComponent },
      { path: 'views', component: MainDefaultViewComponent },
      { path: 'views/cv/:id', component: DefaultViewGeneratorComponent },
      { path: 'views/cv/:id/:qc', component: DefaultViewGeneratorComponent },
      { path: 'threshold', component: MainThresholdComponent },
      { path: 'guideset', component: MainGuideSetComponent },
      { path: 'color', component: MainColorManagementComponent },
      { path: 'troubleshooting', component: MainNonConformitiesComponent },
      {
        path: 'charts', component: MainChartComponent,
        children: [
          { path: 'edit', component: MainChartComponent }
        ]
      },
      { path: 'message', component: MessageComponent },
      { path: 'email', component: EmailComponent },
      { path: 'community-line', component: CommunityLineMainComponent },
      { path: 'community-partner', component: CommunityPartnerMainComponent },
      { path: 'general-annotations', component: GeneralAnnotationsMainComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  providers: []
})
export class AdministrationRouterModule { }
