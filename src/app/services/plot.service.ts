import { Injectable } from '@angular/core';
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

  private dateFromPlot = new Subject<string>();
  dateFromPlot$ = this.dateFromPlot.asObservable();

  private fileChecksum = new Subject<string>();
  fileChecksum$ = this.fileChecksum.asObservable();

  public isCollapsibleOpened(opened: boolean): void {
    this.collapsibleOpened.next(opened);
  }

  public sendClick(data: any, labSystem: System): void {
    this.filenameFromPlot.next(this.getFilenameFromPlotData(data));
    this.fileChecksum.next(this.getFileChecksumFromPlotData(data));
    this.dateFromPlot.next(this.getDateFromPlotData(data));
    this.labSystemFromPlot.next(labSystem);
  }

  private getDateFromPlotData(data: any): string {
    return data['points'][0]['x'];
  }

  private getFilenameFromPlotData(data: any): string {
    let filename: string = data['points'][0]['hovertext'];
    filename = filename.substring(filename.indexOf('<br>') + 4);
    return filename;
  }

  private getFileChecksumFromPlotData(data: any): string {
    return  data['points'][0]['data']['checksums'][data['points'][0]['pointIndex']];
  }

}
