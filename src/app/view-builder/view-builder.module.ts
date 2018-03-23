import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMainComponent } from './view-main/view-main.component';
import { ViewService } from '../services/view.service';
import { CvService } from '../services/cv.service';
import { ChartService } from '../services/chart.service';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DragulaModule
  ],
  declarations: [ViewMainComponent],
  exports: [ViewMainComponent],
  providers: [ViewService,
    CvService,
    ChartService]
})
export class ViewBuilderModule { }
