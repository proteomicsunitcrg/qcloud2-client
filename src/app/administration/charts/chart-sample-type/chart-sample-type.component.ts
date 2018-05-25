import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartService } from '../../../services/chart.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * Sample type selector component
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-sample-type',
  templateUrl: './chart-sample-type.component.html',
  styleUrls: ['./chart-sample-type.component.css']
})
export class ChartSampleTypeComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService) { }

  selectedSampleType: SampleType = new SampleType(null, null, null, null);

  sampleTypes: SampleType[] = [];

  resetComponent$: Subscription;
  chartToEdit$: Subscription;

  ngOnInit() {
    this.loadSampleTypes();
    this.subscribeToReset();
    this.subscribeToChartEdition();
  }
  private subscribeToReset(): void {
    this.resetComponent$ = this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          this.selectedSampleType = new SampleType(null, null, null, null);
        }
      );
  }

  private subscribeToChartEdition(): void {
    this.chartToEdit$ = this.chartService.chartToEdit$
      .subscribe(
        (chart) => {
          this.selectSampleType(chart.sampleType);
        }
      );
  }

  private loadSampleTypes(): void {
    this.sampleTypes = [];
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        (sampleTypes) => {
          sampleTypes.forEach(sampleType => this.sampleTypes.push(sampleType));
        }
      );
  }
  selectSampleType(sampleType: SampleType): void {
    this.selectedSampleType = sampleType;
    this.sampleTypeService.sendSampleTypeToContextSourceSelector(this.selectedSampleType);
  }

}
