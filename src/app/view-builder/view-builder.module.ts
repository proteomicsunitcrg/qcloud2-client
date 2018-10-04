import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMainComponent } from './view-main/view-main.component';
import { CvService } from '../services/cv.service';
import { ChartService } from '../services/chart.service';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';
import { SampleTypeCategoryService } from '../services/sample-type-category.service';
import { SampleTypeLabSystemSelectorComponent } from './sample-type-lab-system-selector/sample-type-lab-system-selector.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DragulaModule
  ],
  declarations: [ViewMainComponent, SampleTypeLabSystemSelectorComponent],
  exports: [ViewMainComponent],
  providers: [CvService,
    ChartService,
    SampleTypeCategoryService]
})
export class ViewBuilderModule { }
