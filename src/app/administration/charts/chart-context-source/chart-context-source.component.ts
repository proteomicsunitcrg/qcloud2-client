import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Param } from '../../../models/param';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ContextSource } from '../../../models/contextSource';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartParam } from '../../../models/chartParam';
import { delay } from 'q';

@Component({
  selector: 'app-chart-context-source',
  templateUrl: './chart-context-source.component.html',
  styleUrls: ['./chart-context-source.component.css']
})
export class ChartContextSourceComponent implements OnInit {

  constructor(private paramService: ParametersService,
    private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService,
    private instrumentSampleService: InstrumentSampleService,
    private chartParamsService: ChartParamsService) { }

  title: String = 'Sources';

  sampleType: SampleType;

  currentParam: Param;

  contextSources: ContextSource[] = [];
  selectedContextSources: ContextSource[] = [];

  chartParamsArray: ChartParam[] = [] ;

  ngOnInit() {
    // Selector
    this.paramService.selectedParameter$
      .subscribe(
        (param) => {
          this.currentParam = param;
          this.loadContextSources();

        });
    this.sampleTypeService.selectedSampleType$
        .subscribe(
          (sampleType) => {
            this.sampleType = sampleType;
            if(this.currentParam!==undefined) {
              this.loadContextSources();
            }
          }
        )
    this.linkChartParamsArray();
    this.subscribeToReset();
  }
  private subscribeToReset(): void {
    this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          // clean selected array
          this.selectedContextSources = [];
          this.contextSources.length = 0;
        }
      )
  }

  private linkChartParamsArray(): void {
    this.chartParamsService.sendChartParamsArrayToFill(this.chartParamsArray);
  }


  private loadContextSources(): void {
    this.contextSources = [];
    switch(this.currentParam.isFor) {
      case 'Peptide':
        if(this.sampleType===undefined) {
          // Show message
        }else {
          this.title = 'Peptides';
          this.sampleCompositionService.getAllPeptidesBySampleType(this.sampleType)
            .subscribe(
              (peptides) => {
                this.loadContextSourcesList(peptides);
              }
            )
        }
        break;
      case 'InstrumentSample':
        this.title = 'Sample meters';
        this.instrumentSampleService.getAllInstrumentSample()
          .subscribe(
            (instrumentSamples) => {
              this.loadContextSourcesList(instrumentSamples);
            }
          )
        break;
    }
  }

  private loadContextSourcesList(contextSources: ContextSource[]): void {
    
    contextSources.forEach(
      (contextSource) => {
        this.contextSources.push(contextSource);
      }
    )
  }

  private fillChartParamsArray(): void {
    /**
     * This is for reset the array without losing the
     * pointer.
     * this.chartParamsArray = [] creates a new array
     * losing the pointer to the original form array
     */
    this.chartParamsArray.length =0;
    this.selectedContextSources.forEach(
      (contextSource) => {
        let chartParam = new ChartParam(null,this.currentParam,contextSource);
        this.chartParamsArray.push(chartParam);
      }
    )
  }

  toggleEditable(event: any,contextSource: ContextSource) {
    if(event.target.checked) {
      this.addContextSource(contextSource);
    }else {
      this.removeContextSource(contextSource);
    }
    this.fillChartParamsArray();
    
  }
  private addContextSource(contextSource: ContextSource): void {
    this.selectedContextSources.push(contextSource);
  }
  private removeContextSource(contextSource: ContextSource) {
    this.selectedContextSources = this.selectedContextSources.filter(cs => cs !==contextSource);
  }

}
