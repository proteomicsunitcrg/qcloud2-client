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
    private instrumentSampleService: InstrumentSampleService,
    private sampleCompositionService: SampleCompositionService,
  ) { }

  @Input('thresholdToEdit') thresholdToEdit: Threshold;
  thresholdNew: Threshold;

  thresholdTypes: string[] = [];

  selectedThresholdParams: ThresholdParam[] = [];

  thresholdConstraint: ThresholdConstraint;

  thresholdParams: ThresholdParam[] = [];

  thresholdDirections: string[] = [];


  ngOnInit() {
    this.loadConstraint(this.thresholdToEdit.thresholdType);
    this.thresholdNew = this.thresholdToEdit;
    M.updateTextFields();
    this.loadThresholdTypes();
    this.loadThresholdDirections();
    // this.loadParam(this.thresholdNew.param);
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
          console.error(error);
        }
      );
  }

  private saveThresholdParams(threshold: Threshold): void {
    this.thresholdService.saveThresholdParams(threshold.thresholdParams, threshold)
      .subscribe(
        (result) => {
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

  public loadConstraint(thresholdType: string): void {
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
    this.thresholdNew.thresholdParams.forEach(
      (tp) => {
        tp.initialValue = value;
      }
    );
  }

  onGlobalStepValueChange(value: number): void {
    this.thresholdNew.thresholdParams.forEach(
      (tp) => {
        tp.stepValue = value;
      }
    );
  }

  public selectUnselectAll(select: string): void {
    if ('select') {
      this.thresholdNew.thresholdParams.forEach(
        (thresholdParam) => {
          thresholdParam.isEnabled = true;
        });
    } else {
      this.thresholdNew.thresholdParams.forEach(
        (thresholdParam) => {
          thresholdParam.isEnabled = false;
        });
    }
  }

  public selectOrUnselect(thresholdParam: ThresholdParam): void {
    thresholdParam.isEnabled = !thresholdParam.isEnabled;
  }

}
