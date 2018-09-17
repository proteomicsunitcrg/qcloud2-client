import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GuideSetPeptideStatus } from '../../../models/guideSetPeptideStatus';
import { Subscription } from 'rxjs';
import { GuideSetService } from '../../../services/guide-set.service';

@Component({
  selector: 'app-guide-set-information',
  templateUrl: './guide-set-information.component.html',
  styleUrls: ['./guide-set-information.component.css']
})
export class GuideSetInformationComponent implements OnInit, OnDestroy {

  selectedGuideSetStatus: GuideSetPeptideStatus[] = null;

  selectedGuideSetStatus$: Subscription;

  selected = false;

  isValidGuidSet: boolean;

  constructor(private guideSetService: GuideSetService,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeToSelectedGuideSetStatus();
  }

  private subscribeToSelectedGuideSetStatus(): void {
    const self = this;

    this.selectedGuideSetStatus$ = this.guideSetService.selectedGuideSetPeptideStatus$
      .subscribe(
        (guideSetPeptideStatus) => {
          this.isValidGuidSet = true;
          this.selectedGuideSetStatus = [];

          guideSetPeptideStatus.forEach(
            (gs) => {
              if (gs.status === 'NO_VALID') {
                this.isValidGuidSet = false;
              }
              this.selectedGuideSetStatus.push(gs);
            }
          );
          this.selected = true;
          self.ref.detectChanges();
          this.guideSetService.sendIsValidGuideSet(this.isValidGuidSet);
        }
      );
  }

  ngOnDestroy() {
    this.selectedGuideSetStatus$.unsubscribe();
  }

}
