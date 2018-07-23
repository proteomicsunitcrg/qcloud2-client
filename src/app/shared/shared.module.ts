import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvFilterPipe } from './cv-filter.pipe';
import { ChartFilterPipe } from './chart-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CvFilterPipe,
    ChartFilterPipe],
  exports: [CvFilterPipe,
  ChartFilterPipe]
})
export class SharedModule { }
