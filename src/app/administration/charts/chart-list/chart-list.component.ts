import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { ChartService } from '../../../services/chart.service';
import { Chart } from '../../../models/chart';
import { ChartParamsService } from '../../../services/chart-params.service';
import { Subscription } from 'rxjs';
import { SampleType } from '../../../models/sampleType';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';
declare var M: any;

/**
 * This component list the existing charts
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit, OnDestroy {

  charts: Chart[];

  constructor(private cvService: CvService,
    private chartService: ChartService,
    private chartParamsService: ChartParamsService,
    private toastr: ToastrService) { }

  resetComponent$: Subscription;
  selectedChartCv$: Subscription;

  limit = 10;

  page = 1;

  maxPages: number;

  filter: Chart = new Chart(null, null, null, null, null, null, null);

  filteredCharts: Chart[] = [];

  filters: { type: string, name: string, code: string }[] = [];

  orderAsc = false;

  orderIcon = 'arrow_drop_up';


  ngOnInit() {
    this.loadAllCharts();
    this.subscribeToCVChange();
    this.subscribeToReset();
  }

  ngOnDestroy() {
    this.resetComponent$.unsubscribe();
    this.selectedChartCv$.unsubscribe();
  }

  private subscribeToReset(): void {
    this.resetComponent$ = this.chartParamsService.resetComponent$
      .subscribe(
        () => {
          this.loadAllCharts();
        }
      );
  }
  /**
   * Get all charts from the database
   */
  private loadAllCharts(): void {
    this.chartService.getAllCharts()
      .subscribe(
        (charts) => {
          this.loadChartsIntoList(charts);
        }
      );
  }

  /**
   * Listen to any CV change at the
   * cv component selector and reload the list
   */
  private subscribeToCVChange(): void {
    this.selectedChartCv$ = this.cvService.selectedChartCv$
      .subscribe(
        (cv) => {
          // show only charts by cv
          const filteredCvs = this.filters.filter(f => f.type === 'cv');

          if (filteredCvs.length > 0) {
            this.filters.splice(this.filters.findIndex(f => f.code === filteredCvs[0].code));
          }

          if (filteredCvs.find(f => f.code === cv.cvid) === undefined) {
            this.filters.push({ type: 'cv', name: cv.name, code: cv.cvid });
            this.filterCharts();
          }

        }
      );
  }

  private loadChartsIntoList(charts: Chart[]): void {
    this.maxPages = charts.length / 10;
    this.charts = charts;
    this.filteredCharts = [];
    charts.forEach(chart => {
      this.filteredCharts.push(chart);
    });
  }

  /**
   * Send a chart to edit and changes the tab
   * @param chart the chart to edit(comming from the DOM)
   */
  editChart(chart: Chart): void {
    // send chart to service
    this.chartService.sendChartToEdit(chart);
    // change tab
    this.chartService.selectTab('newChart');
  }

  onIsThresholdChange(chart: Chart): void {
    // update chart
    this.chartService.chartToDatabase(chart, true)
      .subscribe(
        () => this.toastr.success('Chart updated', null, TOASTSETTING),
        err => console.log(err)
      );
  }

  doSampleTypeFilter(sampleType: SampleType): void {
    // get sampletype filters
    const filteredSampleTypes = this.filters.filter(f => f.type === 'st');
    if (filteredSampleTypes.find(f => f.name === sampleType.name) === undefined) {
      this.filters.push({ type: 'st', name: sampleType.name, code: sampleType.qualityControlControlledVocabulary });
      this.filterCharts();
    }
  }

  doRemoveFilter(filter: any): void {
    this.filters.splice(this.filters.findIndex(f => {
      return f.type === filter.type;
    }), 1);
    this.filterCharts();
  }

  private filterCharts(): void {
    let sampleType = '';
    let cv = '';
    this.filters.forEach(
      (filter) => {
        switch (filter.type) {
          case 'st':
            sampleType = filter.code;
            break;
          case 'cv':
            cv = filter.code;
            break;
        }
      });
    this.filteredCharts = this.charts.filter((chart) => {
      // tslint:disable-next-line:max-line-length
      return (chart.sampleType.qualityControlControlledVocabulary === sampleType || sampleType === '') && (chart.cv.cvid === cv || cv === '') ? true : false;
    });
    this.maxPages = this.filteredCharts.length / 10;
  }

  sortBy(field: string): void {
    switch (field) {
      case 'name':
        if (this.orderAsc) {
          this.filteredCharts.sort((a, b) => {
            return (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0;
          });
          this.orderIcon = 'arrow_drop_down';
        } else {
          this.filteredCharts.sort((a, b) => {
            return (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0;
          });
          this.orderIcon = 'arrow_drop_up';
        }
        this.orderAsc = !this.orderAsc;
        break;
      default:
        break;
    }

  }
}
