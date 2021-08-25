import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HelpRouterModule } from './help-router/help-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { CvService } from '../services/cv.service';
import { DataSourceService } from '../services/data-source.service';
import { SharedModule } from '../shared/shared.module';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { ParametersService } from '../services/parameters.service';
import { ChartService } from '../services/chart.service';
import { GuideSetService } from '../services/guide-set.service';
import { HelpResumeComponent } from './help-resume/help-resume.component';
@NgModule({
  imports: [
    CommonModule,
    HelpRouterModule,
    RouterModule,
    FormsModule,
    SharedModule,
    SharedModulesModule
  ],
  declarations: [
    MainComponent,
    SidebarComponent,
    HelpResumeComponent
  ],
  providers: [CategoryService,
    CvService,
    DataSourceService,
    ParametersService,
    ChartService,
    GuideSetService]
})
export class HelpModule { }
