import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { MiniData } from '../models/miniData';
import { map } from 'rxjs/operators';
import { Chart } from '../models/chart';
import { System } from '../models/system';
import { File } from '../models/file';
import { ContextSource } from '../models/contextSource';
import { Param } from '../models/param';
import { SampleType } from '../models/sampleType';

@Injectable()
export class DataService {

  private apiPrefix = environment.apiPrefix;

  dataUrl = this.apiPrefix + 'api/data';

  constructor(private httpClient: HttpClient) { }

  currentDates: string[];

  /**
   * This observables are for pass the dates to the
   * plots currently displayed
   * Dates are an array of string with YYYY-MM-DD format
   */
  private selectedDates = new Subject<string[]>();
  selectedDates$ = this.selectedDates.asObservable();

  /**
   * Retrieve data from the server
   * @param chart the chart you want to display
   * @param system the lab system to display
   */
  public getPlotData(chart: Chart, system: System): Observable<MiniData[]> {
    return this.httpClient.get<MiniData[]>(this.dataUrl + '/' +
      this.currentDates[0] + '/' +
      this.currentDates[1] + '/' +
      chart.apiKey + '/' + system.apiKey + '/' + chart.sampleType.qualityControlControlledVocabulary)
      .pipe(map(
        (data) => {
          const dataArray = [];
          data.forEach((row) => {
            if (dataArray[row.fileCreationDate] === undefined) {
              dataArray[row.fileCreationDate] = {};
            }
            if (dataArray[row.fileCreationDate][row.contextSourceName] === undefined) {
              dataArray[row.fileCreationDate][row.contextSourceName] = row.value;
            }
            if (dataArray[row.fileCreationDate]['filename'] === undefined) {
              dataArray[row.fileCreationDate]['filename'] = row.fileFilename;
            }
          });
          return dataArray;
        }
      ));
  }

  public getAutoPlotData(labSystemApiKey: string, param: Param,
    contextSource: ContextSource, sampleTypeQccv: string, thresholdId: number): Observable<MiniData[]> {

    const url = this.dataUrl + '/auto/' + labSystemApiKey +
      '/' + param.qCCV + '/' + contextSource.apiKey + '/' + sampleTypeQccv + '/' + thresholdId;

    return this.httpClient.get<MiniData[]>(url).pipe(
      map(
        (data) => {
          const dataArray = [];
          data.forEach((row) => {
            if (dataArray[row.fileCreationDate] === undefined) {
              dataArray[row.fileCreationDate] = {};
            }
            if (dataArray[row.fileCreationDate][row.contextSourceName] === undefined) {
              dataArray[row.fileCreationDate][row.contextSourceName] = row.value;
            }
            if (dataArray[row.fileCreationDate]['filename'] === undefined) {
              dataArray[row.fileCreationDate]['filename'] = row.fileFilename;
            }
          });
          return dataArray;
        }
      )
    );
  }

  /**
   * Get the data for the isotopolgue plot for a given file
   * @param file the file to look for
   * @param abbreviated the abbreviated sequence of the isotpologue
   */
  public getIsotopologuePlotData(file: File, abbreviated: string): Observable<MiniData[]> {
    return this.httpClient.get<MiniData[]>(this.dataUrl + '/iso/' + file.checksum + '/' + abbreviated)
      .pipe(
        map(
          (data) => {
            const dataArray = [];
            data.forEach((row) => {
              if (dataArray[row.fileCreationDate] === undefined) {
                dataArray[row.fileCreationDate] = {};
              }
              if (dataArray[row.fileCreationDate][row.contextSourceName] === undefined) {
                dataArray[row.fileCreationDate][row.contextSourceName] = row.value;
              }
              if (dataArray[row.fileCreationDate]['filename'] === undefined) {
                dataArray[row.fileCreationDate]['filename'] = row.fileFilename;
              }
            });
            return dataArray;
          }
        ));
  }

  public selectDates(datesArray: string[]): void {
    this.currentDates = datesArray;
    this.selectedDates.next(datesArray);
  }

  public getCurrentDates(): string[] {
    return this.currentDates;
  }

}
