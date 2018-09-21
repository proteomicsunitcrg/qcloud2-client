import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GuideSetContextSourceStatus } from '../../../models/guideSetContextSourceStatus';
import { Subscription } from 'rxjs';
import { GuideSetService } from '../../../services/guide-set.service';

@Component({
  selector: 'app-guide-set-information',
  templateUrl: './guide-set-information.component.html',
  styleUrls: ['./guide-set-information.component.css']
})
export class GuideSetInformationComponent implements OnInit, OnDestroy {

  selectedGuideSetStatus: GuideSetContextSourceStatus[] = null;

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

    this.selectedGuideSetStatus$ = this.guideSetService.selectedGuideSetContextSourceStatus$
      .subscribe(
        (guideSetContextSourceStatus) => {
          this.isValidGuidSet = true;
          this.selectedGuideSetStatus = [];

          guideSetContextSourceStatus.forEach(
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
