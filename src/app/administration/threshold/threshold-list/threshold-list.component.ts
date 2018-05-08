import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ThresholdService } from '../../../services/threshold.service';
import { Threshold } from '../../../models/threshold';
import { CV } from '../../../models/cv';

declare var M: any;

@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: ['./threshold-list.component.css']
})
export class ThresholdListComponent implements OnInit {

  constructor(private cvService: CvService,
    private thresholdService: ThresholdService) { }


  thresholds: Threshold[];

  showForm: boolean;

  selectedCV: CV;

  @Output() openThreshold: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    
    this.getAllThresholds();
    this.showForm = false;
  }

  private getAllThresholds(): void {
    this.thresholds = [];
    this.thresholdService.getAllThresholds()
      .subscribe(
        (thresholds) => {
          this.thresholds = thresholds;
          console.log(thresholds);
        }
      )
  }

  openForm(event): void {
    this.openThreshold.emit('fale');
  }

  
}
