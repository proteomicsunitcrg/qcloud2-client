import { Component, OnInit, OnDestroy } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { Category } from '../../../models/category';
import { Chart } from '../../../models/chart';
import { ChartParam } from '../../../models/chartParam';
import { CategoryService } from '../../../services/category.service';
import { delay } from 'q';
import { SampleTypeService } from '../../../services/sample-type.service';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartService } from '../../../services/chart.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';
import { Subscription } from 'rxjs';
import { ParametersService } from '../../../services/parameters.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';
declare var M: any;

/**
 * The chart form. When the form correctly submits
 * it grabs all the chart params from the other components
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css']
})
export class ChartFormComponent implements OnInit, OnDestroy {

  constructor(private cvService: CvService,
    private categoryService: CategoryService,
    private sampleTypeService: SampleTypeService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService,
    private modalService: ModalService,
    private paramService: ParametersService,
    private toastr: ToastrService) { }

  selectedCategory: Category;
  cvs: CV[] = [];

  newChart: Chart = new Chart(null, '', null, null, false, null, null);

  chartParams: ChartParam[] = [];

  isEditing = false;

  categories: Category[] = [];

  chartToEdit$: Subscription;
  chartParamsToFill$: Subscription;
  selectedSampleType$: Subscription;
  selectedChartCv$: Subscription;
  selectedParameter$: Subscription;

  ngOnInit() {
    this.subscribeToCV();
    this.subscribeToSampleType();
    this.subscribeToChartParams();
    this.subscribeToChartEdition();
    this.subscribeToParameter();
  }

  ngOnDestroy() {
    this.chartToEdit$.unsubscribe();
    this.chartParamsToFill$.unsubscribe();
    this.selectedSampleType$.unsubscribe();
    this.selectedChartCv$.unsubscribe();
    this.selectedParameter$.unsubscribe();
  }
  /**
   * This function listens to a chart edit call.
   * There is a delay because I couldnt find another
   * way to enable the text fiedls.
   * It calls the text fields before angular has rendered the
   * DOM
   */
  private subscribeToChartEdition(): void {
    this.chartToEdit$ = this.chartService.chartToEdit$
      .subscribe(
        (chart) => {
          this.newChart = chart;
          delay(1).then(() => M.updateTextFields());
          // load chart params
          this.loadChartParams(chart);
          this.isEditing = true;
        }
      );
  }
  /**
   * This function gets a chart and then load the params
   * from the database, sending it to the service for send
   * the context sources to the context source compoment
   * @param chart the chart to look for its params
   */
  private loadChartParams(chart: Chart): void {
    this.chartParamsService.getChartsParamsByChart(chart)
      .subscribe(
        (chartParams) => {
          chartParams.forEach(
            (chartParam) => {
              this.chartParams.push(new ChartParam(this.newChart, chartParam.contextSource));
            });
          this.chartParamsService.sendContextSourcesToEdit(this.chartParams);
        }
      );
  }
  /**
   * Listen to the chart params of the context source component
   */
  private subscribeToChartParams(): void {
    this.chartParamsToFill$ = this.chartParamsService.chartParamsToFill$
      .subscribe(
        (chartParamsArray) => {
          this.chartParams = chartParamsArray;
        }
      );
  }

  private subscribeToParameter(): void {
    this.selectedParameter$ = this.paramService.selectedParameter$
      .subscribe(
        (parameter) => {
          this.newChart.param = parameter;
        }
      );
  }


  /**
   * Listen to any change of the sample type in the
   * sample type selector compoment
   */
  private subscribeToSampleType(): void {
    this.selectedSampleType$ = this.sampleTypeService.selectedSampleType$
      .subscribe(
        (sampleType) => {
          this.newChart.sampleType = sampleType;
        }
      );
  }
  /**
   * Subscribe to any change of the CV
   */
  private subscribeToCV(): void {
    this.selectedChartCv$ = this.cvService.selectedChartCv$
      .subscribe(
        (cv) => {
          this.newChart.cv = cv;
        }
      );
  }
  /**
   * Get the categories for the list of category
   * in the form. The category is setted in the
   * category service.
   */
  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (result) => {
        this.loadCategoriesIntoList(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /**
   * Materialize function to enable selects
   */
  private enableSelect() {
    const elem = document.getElementById('select_categories');
    const instance = M.FormSelect.init(elem, {});
  }

  /**
   * Load the categories from the function parameter into
   * the list.
   * @param categories an array with the categories to list
   */
  private loadCategoriesIntoList(categories: Category[]) {
    categories.forEach(
      (category) => {
        this.categories.push(new Category(category.id, category.name, category.mainDataSource, category.apiKey));
      }
    );
    this.selectedCategory = this.categories[0];
    this.categoryService.selectCategory(this.selectedCategory);
    delay(100).then(() => {
      this.enableSelect();
    });
  }

  /**
   * Function called when the form is correctly filled
   */
  onSubmit(): void {
    // insert the chart first
    // Check if this is an update or new chart
    this.chartService.chartToDatabase(this.newChart, this.isEditing)
      .subscribe(
        (chart) => {
          // then insert the chart params
          this.addChartToChartParams(chart);
          this.insertChartParams(chart);
        },
        (error) => {
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'newChart', null));
        }
      );
  }
  /**
   * Add the chart returned from the server into
   * each chartParam (check chartParam model to see)
   * @param chart the returned chart(with id) from the server
   * after insert/update
   */
  private addChartToChartParams(chart: Chart): void {
    this.chartParams.forEach(
      (chartParam) => {
        chartParam.chart = chart;
      }
    );
  }
  /**
   * Save the chart params into the database
   * @param chart the chart from the server, it is required
   * for get it's id.
   */
  private insertChartParams(chart: Chart): void {
    this.chartService.chartParamsToDatabase(chart, this.chartParams, this.isEditing)
      .subscribe(
        () => {
          this.chartParamsService.resetComponents();
          this.toastr.success('Chart saved', null, TOASTSETTING);
        },
        (error) => {
          this.modalService.openModal(new Modal(error.error.error, 'Database error', 'Ok', null, 'newChartParams', null));
        }
      );
  }
}

