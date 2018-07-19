import { Injectable } from '@angular/core';
import { Chart } from '../models/chart';
import { System } from '../models/system';
import { Subject } from 'rxjs';

@Injectable()
export class PlotService {

  constructor() { }

  private filenameFromPlot = new Subject<string>();
  filenameFromPlot$ = this.filenameFromPlot.asObservable();

  private labSystemFromPlot = new Subject<System>();
  labSystemFromPlot$ = this.labSystemFromPlot.asObservable();

  private collapsibleOpened = new Subject<boolean>();
  collapsibleOpened$ = this.collapsibleOpened.asObservable();

  public isCollapsibleOpened(opened: boolean): void {
    this.collapsibleOpened.next(opened);
  }

  public sendClick(data: any, labSystem: System): void {
    this.filenameFromPlot.next(this.getFilenameFromPlotData(data));
    this.labSystemFromPlot.next(labSystem);
  }

  private getFilenameFromPlotData(data: any): string {
    return data['points'][0]['hovertext'];
  }

}
