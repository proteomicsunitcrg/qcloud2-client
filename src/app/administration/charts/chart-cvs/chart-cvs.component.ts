import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartService } from '../../../services/chart.service';
import { delay } from 'q';
import { Subscription } from 'rxjs/Subscription';

/**
 * Controled vocabulary selector component.
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-cvs',
  templateUrl: './chart-cvs.component.html',
  styleUrls: ['./chart-cvs.component.css']
})
export class ChartCvsComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
    private cvService: CvService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService) { }

  currentCategory: Category;

  cvs: CV[] = [];

  selectedCv: CV = new CV(null, null, null, null, null, null);

  limit = 10;

  page = 1;

  maxPages: number;

  filter: CV = new CV(null, '', null, '', '', false);

  showEnabledCvs = true;

  chartToEdit$: Subscription;
  resetComponent$: Subscription;

  ngOnInit() {
    this.loadMainCVs();
    this.subscribeToChartEdition();
    this.subscribeToReset();
  }

  ngOnDestroy() {
    this.chartToEdit$.unsubscribe();
    this.resetComponent$.unsubscribe();
  }

  private loadMainCVs(): void {
    // get the main category
    this.categoryService.getMainCategory()
      .subscribe(
        (mainCategory) => {
          this.currentCategory = mainCategory;
          this.getCvListByCategoryFromServer(this.currentCategory);
        }
      );
  }
  /**
   * It listens to any request for edit an
   * existing chart.
   * Please note that chart is not the same chartParam
   */
  private subscribeToChartEdition(): void {
    this.chartToEdit$ = this.chartService.chartToEdit$
      .subscribe(
        (chart) => {
          this.selectedCv = chart.cv;
        }
      );
  }
  /**
   * It listen to the reset signal in order
   * to clean its selectors.
   */
  private subscribeToReset(): void {
    this.resetComponent$ = this.chartParamsService.resetComponent$
      .subscribe(
        (reset) => {
          this.selectedCv = new CV(null, null, null, null, null, null);
        }
      );
  }
  /**
   * When the user clicks on any cv of the list
   * it will send it to the chart form
   * @param cv the cv to send, it comes from the html
   */
  selectCV(cv: CV): void {
    this.selectedCv = cv;
    this.cvService.sendSelectedCvToChartForm(cv);
  }

  /**
   * It gets the current CVs (only enable or all cvs)
   * from the database
   * @param category the category of the CVs to look for
   */
  private getCvListByCategoryFromServer(category: Category) {
    this.cvs = [];
    if (!this.showEnabledCvs) {
      this.cvService.getCvByCategory(category).subscribe(
        (result) => {
          this.loadCvList(result);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cvService.getAllEnabledCVByCategory(category).subscribe(
        (result) => {
          this.loadCvList(result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  /**
   * Get the cvs by param and prepare the
   * filter and the pagination
   * @param cvs an array with the cvs to show
   */
  private loadCvList(cvs: CV[]): void {
    this.maxPages = cvs.length / 10;
    cvs.forEach(cv => {
      this.cvs.push(cv);
    });
  }

  reloadList(): void {
    this.getCvListByCategoryFromServer(this.currentCategory);
  }
}
