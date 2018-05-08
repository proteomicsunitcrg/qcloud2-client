import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';

@Component({
  selector: 'app-main-threshold',
  templateUrl: './main-threshold.component.html',
  styleUrls: ['./main-threshold.component.css']
})
export class MainThresholdComponent implements OnInit {

  constructor(private cvService: CvService) { }

  newThreshold: boolean;
  selectedChart$: Subscription;
  selectedCV: CV;
  isCVSelected: boolean;


  ngOnInit() {
    this.newThreshold = true;
    this.isCVSelected = false;
  }

  open(): void {
    this.newThreshold = true;
  }

  openBuilder(cv: CV): void {
    this.selectedCV = cv;
    this.isCVSelected = true;
  }

}
