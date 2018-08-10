import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { System } from '../../../models/system';
import { SystemService } from '../../../services/system.service';
import { SampleType } from '../../../models/sampleType';
import { FileService } from '../../../services/file.service';
import { ThresholdNonConformityService } from '../../../services/threshold-non-conformity.service';
declare var M: any;

@Component({
  selector: 'app-non-conformities-selector',
  templateUrl: './non-conformities-selector.component.html',
  styleUrls: ['./non-conformities-selector.component.css']
})
export class NonConformitiesSelectorComponent implements OnInit {

  constructor(private labSystemService: SystemService,
    private fileService: FileService,
    private thresholdNonConformityService: ThresholdNonConformityService,
    private ref: ChangeDetectorRef) { }

  labSystems: System[];
  selectedLabSystem: System;

  sampleTypes: SampleType[];
  selectedSampleType: SampleType;

  ngOnInit() {
    this.loadLabSystems();
  }

  private loadLabSystems(): void {
    this.labSystemService.getSystems()
      .subscribe(
        (labSystems) => {
          const self = this;
          this.labSystems = labSystems;
          self.ref.detectChanges();
        }, err => console.log(err),
        () => {
          this.enableSelect('labSystemSelect');
        }
      );
  }

  private enableSelect(selectName: string): void {
    const elem = document.getElementById(selectName);
    M.FormSelect.init(elem, {});
  }

  selectLabSystem(): void {
    // load first page of all nc by labsystem
    this.thresholdNonConformityService.sendSelectedLabSystemToList(this.selectedLabSystem);
    // load available sample types for that lab system
    this.loadSampleTypes(this.selectedLabSystem);
  }

  selectSampleType(): void {
    this.thresholdNonConformityService.sendSelectedSampleTypeToList(this.selectedSampleType);
  }

  private loadSampleTypes(labSystem: System): void {
    this.fileService.getSampleTypesByLabSystem(labSystem)
      .subscribe(
        (sampleTypes) => {
          const self = this;
          this.sampleTypes = sampleTypes;
          self.ref.detectChanges();
        }, err => console.log(err),
        () => {
          this.enableSelect('sampleTypeSelect');
        }
      );
  }

}
