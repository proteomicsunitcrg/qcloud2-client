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


const routes: Routes = [
  //{ path: 'administration', component: MainComponent},
  {path: '', component: MainComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_ADMIN'},
  children: [
    { path: 'category', component: CategoryComponent},
    { path: 'cvs', component: MainCvComponent},
    { path: 'context', component: MainContextSourceComponent},
    { path: 'parameters', component: MainParametersComponent},
    { path: 'sampletypes', component: MainSampleTypeComponent},
    { path: 'charts', component: MainChartComponent}
  ]},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdministrationRouterModule { }
