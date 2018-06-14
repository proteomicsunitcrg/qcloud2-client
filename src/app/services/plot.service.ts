import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { System } from '../models/system';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlotService {

  constructor() { }

  private filenameFromPlot = new Subject<string>();
  filenameFromPlot$ = this.filenameFromPlot.asObservable();

  public sendClick(data: any, chart: Chart, labSystem: System): void {
    this.filenameFromPlot.next(this.getFilenameFromPlotData(data));
  }

  private getFilenameFromPlotData(data: any): string {
    return data['points'][0]['hovertext'];

  }

}
