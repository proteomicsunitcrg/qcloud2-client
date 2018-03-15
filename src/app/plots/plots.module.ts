import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './plot/plot.component';
import { DataService } from '../services/data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlotComponent],
  exports : [PlotComponent],
  providers : [DataService]
})
export class PlotsModule { }
