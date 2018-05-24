import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagementRouterModule } from './management-router/management-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { DataSourceComponent } from './data-source/data-source.component';
import { CvSelectorComponent } from './data-source/cv-selector/cv-selector.component';
import { DataSourceListComponent } from './data-source/data-source-list/data-source-list.component';
import { CvService } from '../services/cv.service';
import { DataSourceService } from '../services/data-source.service';
import { SharedModule } from '../shared/shared.module';
import { MainGuideSetComponent } from './guide-set/main-guide-set/main-guide-set.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { DataSourceGuideSetListComponent } from './guide-set/data-source-guide-set-list/data-source-guide-set-list.component';
import { MainSystemComponent } from './system/main-system/main-system.component';
import { SystemListComponent } from './system/system-list/system-list.component';
import { SystemBuilderComponent } from './system/system-builder/system-builder.component';
import { SystemService } from '../services/system.service';
import { MainThresholdComponent } from './threshold/main-threshold/main-threshold.component';
import { ThresholdListComponent } from './threshold/threshold-list/threshold-list.component';
import { ParametersService } from '../services/parameters.service';
import { ChartService } from '../services/chart.service';
@NgModule({
  imports: [
    CommonModule,
    ManagementRouterModule,
    RouterModule,
    FormsModule,
    SharedModule,
    SharedModulesModule
  ],
  declarations: [MainComponent, 
    SidebarComponent, 
    UsersComponent, 
    DataSourceComponent, 
    CvSelectorComponent, 
    DataSourceListComponent, MainGuideSetComponent, DataSourceGuideSetListComponent, MainSystemComponent, SystemListComponent, SystemBuilderComponent, MainThresholdComponent, ThresholdListComponent],
  providers: [CategoryService,
    CvService,
    DataSourceService,
    SystemService,
    ParametersService,
    ChartService]
})
export class ManagementModule { }
