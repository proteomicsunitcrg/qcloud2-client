import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './plot/plot.component';
import { DataService } from '../services/data.service';
import { ThresholdService } from '../services/threshold.service';
import { PlotService } from '../services/plot.service';
import { IsotopologuePlotComponent } from './isotopologue-plot/isotopologue-plot.component';
import { AutoPlotComponent } from './auto-plot/auto-plot.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlotComponent, IsotopologuePlotComponent, AutoPlotComponent],
  exports : [PlotComponent, IsotopologuePlotComponent, AutoPlotComponent],
  providers : [DataService,
    ThresholdService,
    PlotService]
})
export class PlotsModule { }
