import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SystemService } from '../../services/system.service';
import { System } from '../../models/system';
import { delay } from 'q';
import { SampleTypeService } from '../../services/sample-type.service';
import { SampleType } from '../../models/sampleType';
declare var M: any;

@Component({
  selector: 'app-sample-type-lab-system-selector',
  templateUrl: './sample-type-lab-system-selector.component.html',
  styleUrls: ['./sample-type-lab-system-selector.component.css']
})
export class SampleTypeLabSystemSelectorComponent implements OnInit {

  constructor(private labSystemService: SystemService,
    private sampleTypeService: SampleTypeService) { }

  labSystems: System[] = [];
  sampleTypes: SampleType[] = [];

  @Output() selectedLabSystem: EventEmitter<System> = new EventEmitter<System>();
  @Output() selectedSampleType: EventEmitter<SampleType> = new EventEmitter<SampleType>();

  ngOnInit() {
    this.loadLabSystems();
    this.loadSampleTypes();
  }

  private loadLabSystems(): void {
    this.labSystemService.getSystems()
      .subscribe(
        (labSystems) => {
          this.labSystems = labSystems;
        }, err => console.log(err),
        () => {
          this.enableSelect('labSystemSelect');
        }
      );
  }

  private loadSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        (sampleTypes) => {
          this.sampleTypes = sampleTypes;
        }, err => console.log(err),
        () => {
          this.enableSelect('sampleTypeSelect');
        }
      );
  }

  private enableSelect(selectId: string): void {
    delay(100).then(
      () => {
        const elem = document.getElementById(selectId);
        M.FormSelect.init(elem, {});
      }
    );
  }

  sendLabSystem(event): void {
    const system = this.labSystems.find(ls => ls.apiKey === event);
    // send lab system
    this.selectedLabSystem.emit(system);
  }

  sendSampleType(event): void {
    const sampleType = this.sampleTypes.find(st => st.qualityControlControlledVocabulary === event);
    this.selectedSampleType.emit(sampleType);
  }

}
