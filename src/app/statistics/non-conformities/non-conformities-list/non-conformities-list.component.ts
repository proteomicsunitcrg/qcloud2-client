import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThresholdNonConformityService } from '../../../services/threshold-non-conformity.service';
import { Subscription } from 'rxjs';
import { System } from '../../../models/system';
import { SampleType } from '../../../models/sampleType';
import { ThresholdNonConformity } from '../../../models/thresholdNonConformity';

@Component({
  selector: 'app-non-conformities-list',
  templateUrl: './non-conformities-list.component.html',
  styleUrls: ['./non-conformities-list.component.css']
})
export class NonConformitiesListComponent implements OnInit, OnDestroy {

  constructor(private thresholdNonConformityService: ThresholdNonConformityService) { }

  selectedLabSystem$: Subscription;

  selectedLabSystem: System;

  selectedSampleType: SampleType;

  thresholdNonConformities: ThresholdNonConformity[];

  totalPages: number;

  ngOnInit() {
    this.selectedLabSystem = null;
    this.selectedSampleType = null;
    this.subscribeToLabSystem();
  }

  private subscribeToLabSystem(): void {
    this.selectedLabSystem$ = this.thresholdNonConformityService.selectedLabSystem$
      .subscribe(
        (labSystem) => {
          this.selectedLabSystem = labSystem;
          this.loadThresholdNonConformitiesByLabSystem();
        }
      );
  }

  private loadThresholdNonConformitiesByLabSystem(): void {
    if (this.selectedLabSystem === null && this.selectedSampleType === null) {
      // nothing
    } else if (this.selectedLabSystem !== null && this.selectedSampleType === null) {
      // only labSystem
      this.thresholdNonConformityService.getThresholdNonConformitiesByLabSystem(this.selectedLabSystem, 0)
        .subscribe(
          (resp) => {
            this.totalPages = +resp.headers.get('total');
            this.thresholdNonConformities = resp.body;
          }
        );
    } else {
      // both
    }
  }

  ngOnDestroy() {
    this.selectedLabSystem$.unsubscribe();
  }

}
