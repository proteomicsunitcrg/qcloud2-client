import { Component, OnInit, Input } from '@angular/core';
import { CV } from '../../../models/cv';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { delay } from 'q';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
import { Threshold } from '../../../models/threshold';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { ThresholdService } from '../../../services/threshold.service';
import { ThresholdParam } from '../../../models/thresholdParams';
import { ThresholdConstraint } from '../../../models/thresholdConstraint';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
declare var M: any;
@Component({
  selector: 'app-threshold-builder',
  templateUrl: './threshold-builder.component.html',
  styleUrls: ['./threshold-builder.component.css']
})
export class ThresholdBuilderComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService,
    private paramService: ParametersService,
    private instrumentSampleService: InstrumentSampleService,
    private sampleCompositionService: SampleCompositionService,
    private thresholdService: ThresholdService,
    private modalService: ModalService) { }

  sampleTypes: SampleType[] = [];
  params: Param[] = [];

  thresholdParams: ThresholdParam[] = [];

  threshold: Threshold = new Threshold(null, null, null, null, null, null, null, null, null, null, null, null);

  thresholdTypes: string[] = [];

  thresholdDirections: string[] = [];

  selectedThresholdParams: ThresholdParam[] = [];

  thresholdConstraint: ThresholdConstraint;

  @Input() selectedCV: CV;

  ngOnInit() {
    M.updateTextFields();
    // M.AutoInit();
    this.loadSampleTypes();
    this.loadParameters();
    this.loadThresholdTypes();
    this.loadThresholdDirections();
    this.threshold.cv = this.selectedCV;

  }

  private loadThresholdDirections(): void {
    this.thresholdService.getAllThresholdDirections()
      .subscribe(
        (directions) => this.thresholdDirections = directions,
        err => console.log(err),
        () => delay(1).then(() => M.AutoInit())
      );
  }

  private loadThresholdTypes(): void {
    this.thresholdService.getAllThresholdTypes()
      .subscribe(
        (types) => this.thresholdTypes = types
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

  show(): void {
    console.log(this.selectedThresholdParams);
  }

  onParamChange(event: Param) {
    // load contexts sources by sampletype and event
    switch (event.isFor) {
      case 'Peptide':
        this.sampleCompositionService.getAllPeptidesBySampleType(this.threshold.sampleType)
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

  onSampleTypeChange(sampleType: SampleType): void {
    if (this.threshold.param !== null) {
      if (this.threshold.param.isFor === 'Peptide') {
        this.onParamChange(this.threshold.param);
      }
    }
  }

  onSubmit(): void {
    console.log(this.threshold);
    // return;
    this.thresholdService.saveThreshold(this.threshold)
      .subscribe(
        (threshold) => {
          // save the threshold params
          this.saveThresholdParams(threshold);
        },
        (error) => {
          this.modalService.openModal(new Modal('Error', error.error.message, 'Ok', null, 'newThreshold', null));
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
    this.thresholdParams.forEach(
      (tp) => {
        tp.initialValue = value;
      }
    );
  }

  onGlobalStepValueChange(value: number): void {
    this.thresholdParams.forEach(
      (tp) => {
        tp.stepValue = value;
      }
    );
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

  isChecked(thresholdParam: ThresholdParam): boolean {
    return this.selectedThresholdParams.find(tp => tp.contextSource.apiKey === thresholdParam.contextSource.apiKey) !== undefined;
  }
}
