import { Component, OnInit, Input } from '@angular/core';
import { ThresholdService } from '../../../services/threshold.service';
import { delay } from 'q';
import { Threshold } from '../../../models/threshold';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
import { ThresholdConstraint } from '../../../models/thresholdConstraint';
import { ThresholdParam } from '../../../models/thresholdParams';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';

declare var M: any;


@Component({
  selector: 'app-edit-threshold',
  templateUrl: './edit-threshold.component.html',
  styleUrls: ['./edit-threshold.component.css']
})
export class EditThresholdComponent implements OnInit {

  constructor(
    private thresholdService: ThresholdService,
    private sampleTypeService: SampleTypeService,
    private paramService: ParametersService,
    private instrumentSampleService: InstrumentSampleService,
    private sampleCompositionService: SampleCompositionService,
  ) { }

  // tslint:disable-next-line:no-input-rename
  @Input('thresholdToEdit') thresholdToEdit: Threshold;
  thresholdNew: Threshold;

  thresholdTypes: string[] = [];

  sampleTypes: SampleType[] = [];

  selectedThresholdParams: ThresholdParam[] = [];


  params: Param[] = [];

  thresholdConstraint: ThresholdConstraint;

  thresholdParams: ThresholdParam[] = [];

  thresholdDirections: string[] = [];


  ngOnInit() {
    this.onThresholdTypeChange(this.thresholdToEdit.thresholdType);
    this.thresholdNew = this.thresholdToEdit;
    console.log(this.thresholdToEdit);
    M.updateTextFields();
    this.loadThresholdTypes();
    this.loadSampleTypes();
    this.loadParameters();
    this.loadThresholdDirections();
    this.loadParam(this.thresholdNew.param);
    this.selectedThresholdParams = this.thresholdToEdit.thresholdParams;
    
  }

  private loadThresholdDirections(): void {
    this.thresholdService.getAllThresholdDirections()
      .subscribe(
        (directions) => this.thresholdDirections = directions,
        err => console.log(err),
        () => delay(1).then(() => M.AutoInit())
      );
  }
  onSubmit(): void {
    this.thresholdService.editThreshold(this.thresholdNew)
      .subscribe(
        (threshold) => {
          this.saveThresholdParams(threshold);
        },
        (error) => {
        }
      );
  }

  private saveThresholdParams(threshold: Threshold): void {
    this.selectedThresholdParams.forEach(
      (thresholdParam) => {
        thresholdParam.threshold = threshold;
      }
    );
    this.thresholdService.saveThresholdParams(this.selectedThresholdParams)
      .subscribe(
        (result) => {
          console.log(result);
          // go back
          this.thresholdService.resetBuilder();
        },
        (err) => console.log(err)
      );
  }

  private loadThresholdTypes(): void {
    this.thresholdService.getAllThresholdTypes()
      .subscribe(
        (types) => {
          this.thresholdTypes = types;
        }
        , err => console.log(err),
        () => delay(1).then(() => M.AutoInit()));
  }

  private loadParameters(): void {
    this.paramService.getAllParams()
      .subscribe(
        (params) => {
          this.params = params;
        }, error => console.log(error),
        () => delay(1).then(() => M.AutoInit())
      );
  }

  private loadSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        (sampleTypes) => {
          this.sampleTypes = sampleTypes;
        }, error => console.log(error),
        () => {
          delay(1).then(() => M.AutoInit());
        }
      );
  }

  onThresholdTypeChange(thresholdType: string): void {
    this.thresholdService.getThresholdConstraints(thresholdType)
      .subscribe(
        (constraint) => {
          this.thresholdConstraint = constraint;
          delay(1).then(() => {
            M.updateTextFields();
            M.AutoInit();
          });
        }
      );
  }

  onGlobalInitialValueChange(value: number): void {
    // return;
    this.thresholdParams.forEach(
      (tp) => {
        tp.initialValue = value;
      }
    );
  }

  onGlobalStepValueChange(value: number): void {
    // return;
    this.thresholdParams.forEach(
      (tp) => {
        tp.stepValue = value;
      }
    );
  }

  loadParam(event: Param) {
    // load contexts sources by sampletype and event
    switch (event.isFor) {
      case 'Peptide':
        this.sampleCompositionService.getAllPeptidesBySampleType(this.thresholdNew.sampleType)
          .subscribe(
            (peptides) => {
              this.thresholdParams = [];
              peptides.forEach(
                (p) => this.thresholdParams.push(new ThresholdParam(null, p, 0, 0, true))
              );
            }
          );
        break;
      case 'InstrumentSample':
        this.instrumentSampleService.getAllInstrumentSample()
          .subscribe(
            (instrumentSamples) => {
              this.thresholdParams = [];
              instrumentSamples.forEach(
                (p) => this.thresholdParams.push(new ThresholdParam(null, p, 0, 0, true))
              );
            }, err => console.log(err)
          );
        break;
      default:
        console.log(event.isFor);
    }
  }

  isChecked(thresholdParam: ThresholdParam): boolean {
    return this.selectedThresholdParams.find(tp => tp.contextSource.apiKey === thresholdParam.contextSource.apiKey) !== undefined;
  }

  toggleEditable(event: any, thresholdParam: ThresholdParam) {
    if (event.target.checked) {
      this.addThresholdParam(thresholdParam);
    } else {
      this.removeThresholdParam(thresholdParam);
    }
  }

  private addThresholdParam(thresholdParam: ThresholdParam): void {
    this.selectedThresholdParams.push(thresholdParam);
  }

  private removeThresholdParam(thresholdParam: ThresholdParam): void {
    this.selectedThresholdParams = this.selectedThresholdParams.filter(tp => tp.contextSource.id !== thresholdParam.contextSource.id);
  }

  selectAll(all: boolean): void {
    if (all) {
      this.thresholdParams.forEach(
        (thresholdParam) => {
          this.addThresholdParam(thresholdParam);
        });
    } else {
      this.selectedThresholdParams = [];
    }
  }

}
