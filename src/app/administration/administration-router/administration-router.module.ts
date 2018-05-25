import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../../auth-guard.service';
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

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [RoleGuard], data: {expectedRole: 'ROLE_ADMIN'},
  children: [
    { path: 'category', component: CategoryComponent},
    { path: 'cvs', component: MainCvComponent},
    { path: 'context', component: MainContextSourceComponent},
    { path: 'parameters', component: MainParametersComponent},
    { path: 'sampletypecategories', component: SampleTypeCategoryComponent},
    { path: 'sampletypes', component: MainSampleTypeComponent},
    { path: 'views', component: MainDefaultViewComponent},
    { path: 'views/cv/:id', component: DefaultViewGeneratorComponent},
    { path: 'views/cv/:id/:qc', component: DefaultViewGeneratorComponent},
    { path: 'threshold', component: MainThresholdComponent},
    { path: 'charts', component: MainChartComponent,
      children: [
        { path: 'edit', component: MainChartComponent}
      ]},
  ]},
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
