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

  selectedSampleType$: Subscription;

  selectedSampleType: SampleType;

  thresholdNonConformities: ThresholdNonConformity[];

  page = 1;

  maxPages: number;

  ngOnInit() {
    this.selectedLabSystem = null;
    this.selectedSampleType = null;
    this.subscribeToLabSystem();
    this.subscribeToSampleType();
  }

  private subscribeToLabSystem(): void {
    this.selectedLabSystem$ = this.thresholdNonConformityService.selectedLabSystem$
      .subscribe(
        (labSystem) => {
          this.selectedLabSystem = labSystem;
          this.page = 1;
          this.loadThresholdNonConformitiesByLabSystem();
        }
      );
  }

  private subscribeToSampleType(): void {
    this.selectedSampleType$ = this.thresholdNonConformityService.selectedSampleType$
      .subscribe(
        (sampleType) => {
          this.selectedSampleType = sampleType;
          this.page = 1;
          this.loadThresholdNonConformitiesByLabSystem();
        }
      );
  }

  private loadThresholdNonConformitiesByLabSystem(): void {
    if (this.selectedLabSystem === null && this.selectedSampleType === null) {
      // nothing
    } else if (this.selectedLabSystem !== null && this.selectedSampleType === null) {
      // only labSystem
      this.thresholdNonConformityService.getThresholdNonConformitiesByLabSystem(this.selectedLabSystem, this.page - 1)
        .subscribe(
          (resp) => {
            this.maxPages = +resp.headers.get('total');
            this.thresholdNonConformities = resp.body;
          }
        );
    } else {
      // both
      this.thresholdNonConformityService.getThresholdNonConformitiesByLabSystemAndSampleType(this.selectedLabSystem,
        this.selectedSampleType, this.page - 1)
        .subscribe(
          (resp) => {
            this.maxPages = +resp.headers.get('total');
            this.thresholdNonConformities = resp.body;
          }
        );
    }
  }

  ngOnDestroy() {
    this.selectedLabSystem$.unsubscribe();
    this.selectedSampleType$.unsubscribe();
  }

  selectThresholdNonConformity(thresholdNonConformity: ThresholdNonConformity): void {
    console.log(thresholdNonConformity);
  }

  changePage(page: number) {
    this.page = page;
    this.loadThresholdNonConformitiesByLabSystem();

  }

}
