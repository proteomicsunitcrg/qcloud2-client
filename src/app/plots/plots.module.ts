import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './plot/plot.component';
import { DataService } from '../services/data.service';
import { ThresholdService } from '../services/threshold.service';
import { PlotService } from '../services/plot.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlotComponent],
  exports : [PlotComponent],
  providers : [DataService,
    ThresholdService,
    PlotService]
})
export class PlotsModule { }
