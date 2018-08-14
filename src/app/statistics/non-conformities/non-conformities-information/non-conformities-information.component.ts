import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThresholdNonConformityService } from '../../../services/threshold-non-conformity.service';
import { Subscription } from 'rxjs';
import { ThresholdNonConformity } from '../../../models/thresholdNonConformity';

@Component({
  selector: 'app-non-conformities-information',
  templateUrl: './non-conformities-information.component.html',
  styleUrls: ['./non-conformities-information.component.css']
})
export class NonConformitiesInformationComponent implements OnInit, OnDestroy {

  constructor(private thresholdNonConformityService: ThresholdNonConformityService) { }

  selectedThresholdNonConformity$: Subscription;

  thnc: ThresholdNonConformity;

  ngOnInit() {
    this.subscribeToThresholdNonConformity();
  }

  private subscribeToThresholdNonConformity(): void {
    this.selectedThresholdNonConformity$ = this.thresholdNonConformityService.selectedThresholdNonConformity$
      .subscribe(
        (thnc) => {
          this.thnc = thnc;
        }
      );
  }

  ngOnDestroy() {
    this.selectedThresholdNonConformity$.unsubscribe();
  }

}
