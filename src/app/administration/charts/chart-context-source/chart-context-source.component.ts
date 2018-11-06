import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParametersService } from '../../../services/parameters.service';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { Param } from '../../../models/param';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ContextSource } from '../../../models/contextSource';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartParam } from '../../../models/chartParam';
import { Subscription } from 'rxjs';
import { ChartService } from '../../../services/chart.service';

/**
 * Context source selector component.
 * It get the sample type by subcription and updates
 * its list accordingly with the requested context source
 * At this moment (april,2018) there are only
 * peptides and instrument sample
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-context-source',
  templateUrl: './chart-context-source.component.html',
  styleUrls: ['./chart-context-source.component.css']
})
export class ChartContextSourceComponent implements OnInit, OnDestroy {

  constructor(private paramService: ParametersService,
    private sampleTypeService: SampleTypeService,
    private sampleCompositionService: SampleCompositionService,
    private instrumentSampleService: InstrumentSampleService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService) { }

  title: String = 'Sources';

  sampleType: SampleType;

  currentParam: Param;

  contextSources: ContextSource[] = [];
  selectedContextSources: ContextSource[] = [];

  chartParamsArray: ChartParam[] = [];

  selectedContextSources$: Subscription;
  selectedParameter$: Subscription;
  selectedSampleType$: Subscription;
  resetComponent$: Subscription;
  editingChart$: Subscription;

  editing: boolean;

  ngOnInit() {
    this.subscribeToChartParamsToEdit();
    this.subscribeToSelectedParameter();
    this.subscribeToSelectedSampleType();
    this.subscribeToChartEditing();
    this.linkChartParamsArray();
    this.subscribeToReset();
  }

  ngOnDestroy() {
    this.selectedContextSources$.unsubscribe();
    this.selectedParameter$.unsubscribe();
    this.selectedSampleType$.unsubscribe();
    this.resetComponent$.unsubscribe();
    this.editingChart$.unsubscribe();
  }

  isChecked(contextSource: ContextSource): boolean {
    return this.selectedContextSources.find(c => c.id === contextSource.id) !== undefined;
  }

  private subscribeToChartEditing(): void {
    this.editingChart$ = this.chartService.editingChart$
      .subscribe(
        (editing) => {
          this.editing = true;
        }
      );
  }

  private subscribeToChartParamsToEdit(): void {
    this.selectedContextSources$ = this.chartParamsService.selectedContextSources$
      .subscribe(
        (contextSources) => {
          this.addContextSourcesToArray(contextSources);
        }, error => console.log(error)
      );
  }
  /**
   * Load a new context sources array into the list
   * @param contextSources an array with the context sources
   */
  private addContextSourcesToArray(contextSources: ContextSource[]): void {
    this.selectedContextSources = [];
    contextSources.forEach(
      (contextSource) => this.selectedContextSources.push(contextSource)
    );
    this.fillChartParamsArray();
  }


  private subscribeToSelectedParameter(): void {
    this.selectedParameter$ = this.paramService.selectedParameter$
      .subscribe(
        (param) => {
          if (this.editing) {
            this.editing = false;
          } else {
            this.selectedContextSources = [];
            this.fillChartParamsArray();
          }
          this.currentParam = param;
          this.loadContextSources();
        });
  }


  private subscribeToSelectedSampleType(): void {
    this.selectedSampleType$ = this.sampleTypeService.selectedSampleType$
      .subscribe(
        (sampleType) => {
          this.sampleType = sampleType;
          if (this.currentParam !== undefined) {
            this.loadContextSources();
          }
        });
  }

  private subscribeToReset(): void {
    this.resetComponent$ = this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          // clean selected array
          this.selectedContextSources = [];
          this.contextSources.length = 0;
          this.title = 'Sources';
        }
      );
  }

  private linkChartParamsArray(): void {
    this.chartParamsService.sendChartParamsArrayToFill(this.chartParamsArray);
  }


  private loadContextSources(): void {
    this.contextSources = [];
    switch (this.currentParam.isFor) {
      case 'Peptide':
        if (this.sampleType === undefined) {
          // Show message
        } else {
          this.title = 'Peptides';
          this.sampleCompositionService.getAllPeptidesBySampleType(this.sampleType)
            .subscribe(
              (peptides) => {
                this.loadContextSourcesList(peptides);
              }
            );
        }
        break;
      case 'InstrumentSample':
        this.title = 'Sample meters';
        this.instrumentSampleService.getAllInstrumentSample()
          .subscribe(
            (instrumentSamples) => {
              this.loadContextSourcesList(instrumentSamples);
            }
          );
        break;
    }
  }

  private loadContextSourcesList(contextSources: ContextSource[]): void {
    contextSources.forEach(
      (contextSource) => {
        this.contextSources.push(contextSource);
      }
    );
  }

  private fillChartParamsArray(): void {
    /**
     * This is for reset the array without losing the
     * pointer.
     * this.chartParamsArray = [] creates a new array
     * losing the pointer to the original form array
     */
    this.chartParamsArray.length = 0;
    this.selectedContextSources.forEach(
      (contextSource) => {
        const chartParam = new ChartParam(null, contextSource);
        this.chartParamsArray.push(chartParam);
      }
    );
  }

  toggleEditable(event: any, contextSource: ContextSource) {
    if (event.target.checked) {
      this.addContextSource(contextSource);
    } else {
      this.removeContextSource(contextSource);
    }
    this.fillChartParamsArray();

  }
  private addContextSource(contextSource: ContextSource): void {
    this.selectedContextSources.push(contextSource);
  }
  private removeContextSource(contextSource: ContextSource) {
    this.selectedContextSources = this.selectedContextSources.filter(cs => cs.id !== contextSource.id);
  }

  selectAll(all: boolean): void {
    if (all) {
      this.contextSources.forEach(
        (contextSource) => {
          this.addContextSource(contextSource);
        });
    } else {
      this.selectedContextSources = [];
    }
    this.fillChartParamsArray();
  }

}
