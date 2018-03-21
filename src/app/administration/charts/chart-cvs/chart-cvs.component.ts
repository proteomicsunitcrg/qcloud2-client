import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartService } from '../../../services/chart.service';
import { delay } from 'q';

@Component({
  selector: 'app-chart-cvs',
  templateUrl: './chart-cvs.component.html',
  styleUrls: ['./chart-cvs.component.css']
})
export class ChartCvsComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private cvService: CvService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService) { }

  currentCategory: Category;

  cvs: CV[] = [];

  selectedCv: CV = new CV(null,null,null,null,null,null);

  limit = 10;

  page = 1;

  maxPages: number;

  filter: CV = new CV(null, '', null, '', '', false);

  showEnabledCvs: boolean = true;

  ngOnInit() {
    // Listen to category changes
    this.categoryService.selectedCategory$.subscribe(
      (category) => {
        // Load cvs by category
        this.currentCategory = category;
        this.getCvListByCategoryFromServer(this.currentCategory);
      }
    )
    this.subscribeToChartEdition();
    this.subscribeToReset();
  }

  private subscribeToChartEdition(): void {
    this.chartService.chartToEdit$
      .subscribe(
        (chart) => {
          this.selectedCv=chart.cv;
        }
      )
  }

  private subscribeToReset(): void {
    this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          this.selectedCv = new CV(null,null,null,null,null,null);
        }
      )
  }

  selectCV(cv: CV): void {
    this.selectedCv = cv;
    this.cvService.sendSelectedCvToChartForm(cv);
  }

  private getCvListByCategoryFromServer(category: Category) {
    this.cvs = [];
    if(!this.showEnabledCvs) {
      this.cvService.getCvByCategory(category).subscribe(
        (result) => {
          this.loadCvList(result);
        },
        (error) => {
          console.log(error);
        }
      )
    }else {
      this.cvService.getAllEnabledCVByCategory(category).subscribe(
        (result) => {
          this.loadCvList(result);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  private loadCvList(cvs: CV[]): void {    
    this.maxPages = cvs.length / 10;
    cvs.forEach(cv => {
      this.cvs.push(cv);
    })    
  }

  reloadList(): void {
    this.getCvListByCategoryFromServer(this.currentCategory);
  }
}
