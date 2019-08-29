import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CV } from '../../../models/cv';
import { ThresholdService } from '../../../services/threshold.service';
import { Threshold } from '../../../models/threshold';

@Component({
  selector: 'app-main-threshold',
  templateUrl: './main-threshold.component.html',
  styleUrls: ['./main-threshold.component.css']
})

export class MainThresholdComponent implements OnInit, OnDestroy {

  constructor(private thresholdService: ThresholdService) { }

  newThreshold: boolean;
  selectedChart$: Subscription;
  selectedCV: CV;
  isCVSelected: boolean;
  editThreshold: boolean;
  thresholdNav: any[] = [];
  thresholdToEdit: Threshold;

  resetBuilder$: Subscription;

  cosa = [
    {
      name: 'CV selector',
    },
    {
      name: 'builder',
    }
  ];

  ngOnInit() {
    this.newThreshold = false;
    this.isCVSelected = false;
    this.editThreshold = false;
    this.subscribeToBuilderReset();
  }

  ngOnDestroy() {
    this.resetBuilder$.unsubscribe();
  }

  open(): void {
    this.newThreshold = true;
    // this.thresholdNav.push('CV selector');
    this.thresholdNav.push(this.cosa[0]);
  }

  edit(threshold: Threshold): void {
    this.thresholdToEdit = threshold;
    this.editThreshold = true;
  }

  openBuilder(cv: CV): void {
    this.editThreshold = false;
    this.selectedCV = cv;
    this.isCVSelected = true;
    this.thresholdNav.push(this.cosa[1]);
  }

  openEditor(): void {
    this.editThreshold = true;
  }

  closeThreshold(condition: boolean): void {
    this.newThreshold = false;
    this.isCVSelected = false;
    this.thresholdNav = [];
  }

  doBreadClick(nav: number): void {
    if (nav + 1 !== this.thresholdNav.length) {
      this.thresholdNav.pop();
      this.isCVSelected = false;
      this.selectedCV = null;
    }
  }

  private subscribeToBuilderReset(): void {
    this.resetBuilder$ = this.thresholdService.resetThresholdBuilder$
      .subscribe(
        () => {
          this.closeThreshold(true);
        }
      );
  }

  public checkEditOrNew(): boolean {
    return this.editThreshold || this.newThreshold;
  }

}
