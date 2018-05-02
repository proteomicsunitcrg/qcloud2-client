import { Component, OnInit, OnDestroy } from '@angular/core';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
import { Router } from '@angular/router';
import { CvService } from '../../../services/cv.service';
import { Subscription } from 'rxjs/Subscription';
import { CV } from '../../../models/cv';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit, OnDestroy {

  constructor(private viewService: ViewService,
    private router: Router,
    private cvService: CvService) { }

  defaultViews: View[] = [];

  cvFilter: string;
  showFilter: boolean;

  selectedChartCv$: Subscription;  

  ngOnInit() {
    // load views
    this.loadDefaultViews();
    this.subscribeToCVSelector();
    this.showFilter = false;
  }
  ngOnDestroy() {
    this.selectedChartCv$.unsubscribe();
  }

  private subscribeToCVSelector(): void {
    this.selectedChartCv$ = this.cvService.selectedChartCv$
      .subscribe(
        (cv) => {
          this.showFilter= true;
          this.cvFilter = cv.name;
          this.loadDefaultViewsByCV(cv);
        }
      )
  }

  private loadDefaultViewsByCV(cv: CV): void {
    this.viewService.getDefaultViewsByCVId(cv.cvid)
      .subscribe(
        (defaultViews) => {
          this.defaultViews = defaultViews;
        }
      )
  }

  private loadDefaultViews(): void {
    this.viewService.getDefaultViews()
      .subscribe(
        (defaultViews)=> {
          this.defaultViews = defaultViews;
        }
      )
  }

  editView(view: View): void {
    this.router.navigate(['/application/administration/views/cv',view.cv.cvid,view.sampleTypeCategory.id]);
  }

  removeFilter(): void {
    this.showFilter = false;
    this.loadDefaultViews();
    
  }

}
