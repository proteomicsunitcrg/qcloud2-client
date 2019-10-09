import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { ThresholdService } from '../../../services/threshold.service';
import { Threshold } from '../../../models/threshold';
import { CV } from '../../../models/cv';
import { delay } from 'q';


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

  viewThresholdContextSources: string;

  showForm: boolean;

  selectedCV: CV;
  
  searchTerm: string;

  thresholdDirections: string[] = [];

  @Output() openThreshold: EventEmitter<string> = new EventEmitter<string>();

  @Output() editThresholdOutput: EventEmitter<Threshold> = new EventEmitter<Threshold>();

  ngOnInit() {
    this.getAllThresholds();
    this.showForm = false;
    this.loadThresholdDirections();
  }

  private getAllThresholds(): void {
    this.thresholds = [];
    this.thresholdService.getAllThresholds()
      .subscribe(
        (thresholds) => {
          console.log(thresholds);
          
          thresholds.forEach((threshold) => {
            threshold['editing'] = false;
          });
          this.thresholds = thresholds;
        }
      );
  }

  private loadThresholdDirections(): void {
    this.thresholdService.getAllThresholdDirections()
      .subscribe(
        (directions) => this.thresholdDirections = directions,
        err => console.log(err),
        () => delay(1).then(() => M.AutoInit())
      );
  }

  public editThreshold(threshold: Threshold): void {
    this.editThresholdOutput.emit(threshold);
  }

  openForm(event): void {
    this.openThreshold.emit('fale');
  }

  doVisible(thresholdApiKey: string): void {
    this.viewThresholdContextSources = thresholdApiKey;
  }
}
