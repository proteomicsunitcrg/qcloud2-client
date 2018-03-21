import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLayoutComponent } from './view-layout/view-layout.component';
import { ViewListComponent } from './view-list/view-list.component';
import { ViewMainComponent } from './view-main/view-main.component';
import { ViewService } from '../services/view.service';
import { CvService } from '../services/cv.service';
import { ChartService } from '../services/chart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewLayoutComponent, ViewListComponent, ViewMainComponent],
  exports: [ViewMainComponent],
  providers: [ViewService,
    CvService,
    ChartService]
})
export class ViewBuilderModule { }
