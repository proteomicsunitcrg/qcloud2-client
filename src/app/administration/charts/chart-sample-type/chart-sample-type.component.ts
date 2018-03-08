import { Component, OnInit } from '@angular/core';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { ChartParamsService } from '../../../services/chart-params.service';

@Component({
  selector: 'app-chart-sample-type',
  templateUrl: './chart-sample-type.component.html',
  styleUrls: ['./chart-sample-type.component.css']
})
export class ChartSampleTypeComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private chartParamsService: ChartParamsService) { }

  selectedSampleType: SampleType;

  sampleTypes: SampleType[] = [];

  ngOnInit() {
    this.loadSampleTypes();
    this.subscribeToReset();
  }
  private subscribeToReset(): void {
    this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          this.selectedSampleType = null;
        }
      )
  }

  private loadSampleTypes():void {
    this.sampleTypes = [];
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        (sampleTypes) => {
          sampleTypes.forEach(sampleType => this.sampleTypes.push(sampleType))
        }
      )
  }
  selectSampleType(sampleType: SampleType): void {
    this.selectedSampleType = sampleType;
    this.sampleTypeService.sendSampleTypeToContextSourceSelector(this.selectedSampleType);
  }

}
