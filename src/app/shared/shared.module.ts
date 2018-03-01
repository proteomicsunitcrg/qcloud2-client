import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvFilterPipe } from './cv-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CvFilterPipe],
  exports: [CvFilterPipe]
})
export class SharedModule { }
