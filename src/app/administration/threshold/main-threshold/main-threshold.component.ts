import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CV } from '../../../models/cv';
import { ThresholdService } from '../../../services/threshold.service';

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

  thresholdNav: any[] = [];

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

  openBuilder(cv: CV): void {
    this.selectedCV = cv;
    this.isCVSelected = true;
    this.thresholdNav.push(this.cosa[1]);
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

}
