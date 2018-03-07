import { Component, OnInit } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Param } from '../../../models/param';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ContextSource } from '../../../models/contextSource';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';

@Component({
  selector: 'app-chart-context-source',
  templateUrl: './chart-context-source.component.html',
  styleUrls: ['./chart-context-source.component.css']
})
export class ChartContextSourceComponent implements OnInit {

  constructor(private paramService: ParametersService,
    private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService,
    private instrumentSampleService: InstrumentSampleService) { }

  title: String = 'Sources';

  sampleType: SampleType;

  currentParam: Param;

  contextSources: ContextSource[] = [];


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

  check(): void {
    console.log('hiho');
  }

}
