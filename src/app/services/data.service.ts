import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Chart } from '../models/chart';
import { File } from '../models/file';
import { GuideSet } from '../models/guideSet';
import { LabSystemStatus } from '../models/labsystemstatus';
import { MiniData } from '../models/miniData';
import { PlotTrace } from '../models/plotTrace';
import { System } from '../models/system';
import { TraceColor } from '../models/TraceColor';

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
      this.currentDates[0] + 'T00:00:00.000+02:00/' +
      this.currentDates[1] + 'T23:59:59.000+02:00/' +
      chart.apiKey + '/' + system.apiKey + '/' + chart.sampleType.qualityControlControlledVocabulary)
      .pipe(map(
        (data) => {
          return this.mapPlotData(data);
        }
      ));
  }

  public getPlotTraceData(chart: Chart, system: System): Observable<PlotTrace[]> {
    return this.httpClient.get<PlotTrace[]>(this.dataUrl + '/traces/' +
      this.currentDates[0] + 'T00:00:00.000+02:00/' +
      this.currentDates[1] + 'T23:59:59.000+02:00/' +
      chart.apiKey + '/' + system.apiKey + '/' + chart.sampleType.qualityControlControlledVocabulary)
      .pipe(map(
        (data) => {
          data.forEach(
            (trace) => {
              try {
                trace.traceColor = new TraceColor(trace.traceColor.mainColor, trace.traceColor.apiKey);
              } catch (err) {
                // TODO: work for a color control inside the client, last resort
                throw new Error('No color defined');
              }
            }
          );
          return data;
        }), catchError(err => {
          throw err;
        })
      );
  }

  public getAutoPlotData(ls: LabSystemStatus): Observable<MiniData[]> {
    const url = this.dataUrl + '/auto/' + ls.labSystemApikey +
      '/' + ls.param.qCCV + '/' + ls.contextSource.apiKey + '/' + ls.thresholdApiKey;

    return this.httpClient.get<MiniData[]>(url).pipe(
      map(
        (data) => {
          return this.mapPlotData(data);
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
            return this.mapPlotData(data);
          }
        ));
  }
  /**
   * Get the data for a non conformity plot
   * @param labSystemApiKey
   * @param paramQccv
   * @param contextSourceApiKey
   * @param fileChecksum
   */
  public getNonConformityPlotData(labSystemApiKey: string,
    paramQccv: string,
    contextSourceApiKey: string,
    sampleTypeQqcv: string,
    fileChecksum: string,
    guideSet: GuideSet): Observable<MiniData[]> {
    let url = this.dataUrl + '/nonconformity/'
      + labSystemApiKey + '/' + paramQccv + '/' + contextSourceApiKey + '/' + sampleTypeQqcv + '/' + fileChecksum;
    if (guideSet !== null) {
      url += '/?guideSet=' + guideSet.apiKey;
    }
    return this.httpClient.get<MiniData[]>(url)
      .pipe(
        map(
          (data) => {
            return this.mapPlotData(data);
          }
        )
      );
  }

  public mapPlotData(data: MiniData[]): any[] {
    const dataArray = [];
    data.forEach((row) => {
      if (dataArray[row.fileCreationDate] === undefined) {
        dataArray[row.fileCreationDate] = {};
      }
      if (dataArray[row.fileCreationDate][row.contextSourceName] === undefined) {
        dataArray[row.fileCreationDate][row.contextSourceName] = { 'value': row.value, 'nc': row.nonConformityStatus };
      }
      if (dataArray[row.fileCreationDate]['filename'] === undefined) {
        dataArray[row.fileCreationDate]['filename'] = row.fileFilename;
      }
    });
    return dataArray;
  }



  public selectDates(datesArray: string[]): void {
    this.currentDates = datesArray;
    this.selectedDates.next(datesArray);
  }

  public getCurrentDates(): string[] {
    return this.currentDates;
  }

  public getDataBetweenTwoDates(labSystemApiKey, guideSetSampleTypeName, from, to):Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.get(this.dataUrl + `/between/${from}T00:00:00.000+00:00/${to}T23:59:59.000+02:00/${labSystemApiKey}/${guideSetSampleTypeName}`, {headers: headers});
  }

}
