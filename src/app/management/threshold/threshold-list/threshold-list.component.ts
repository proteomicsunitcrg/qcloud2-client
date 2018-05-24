import { Component, OnInit } from '@angular/core';
import { ThresholdService } from '../../../services/threshold.service';
import { Threshold } from '../../../models/threshold';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
declare var M:any;

@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: ['./threshold-list.component.css']
})
export class ThresholdListComponent implements OnInit {

  constructor(private thresholdService: ThresholdService,
    private labSystemService: SystemService) { }

  
  userThresholds: Threshold[] = [];
  labSystems: System[] = [];
  labSystemThresholds: {labSystem: System, thresholds: Threshold[]}[] = [];

  ngOnInit() {
    this.labSystemService.getSystems()
      .subscribe(
        (labSystems) => {
          this.labSystems = labSystems;
        },err => console.log(err),
        ()=> {
          this.loadThresholds();
        }
      )
  }
  
  private loadThresholds(): void {
    this.labSystems.forEach(
      (labSystem) => {
        this.thresholdService.getAllThresholdsBySystem(labSystem)
          .subscribe(
            (thresholds) => {
              this.labSystemThresholds.push({
                labSystem : labSystem,
                thresholds : thresholds
              })
            },err => console.log(err),
            () => console.log(this.labSystemThresholds)
          )
      }
    )
  }
  /**
   * Toggle the selected cv on/off
   * @param cv 
   */
  /*
   changeStatus(cv: CV) {
    this.cvService.changeEnabled(cv.id).subscribe(
      (result)=> {
        cv.enabled = result.enabled;
      },
      (error)=> {
        this.showModalByError(error);
      }
    );    
  }
  */


}
