import { Component, OnInit } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { Category } from '../../../models/category';
import { Chart } from '../../../models/chart';
import { ChartParam } from '../../../models/chartParam';
import { CategoryService } from '../../../services/category.service';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';
import { SampleTypeService } from '../../../services/sample-type.service';
import { ChartParamsService } from '../../../services/chart-params.service';
import { ChartService } from '../../../services/chart.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';


@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css']
})
export class ChartFormComponent implements OnInit {

  constructor(private cvService: CvService,
    private categoryService: CategoryService,
    private sampleTypeService: SampleTypeService,
    private chartParamsService: ChartParamsService,
    private chartService: ChartService,
    private ModalService: ModalService) { }

  selectedCategory: Category;
  cvs: CV[] = [];

  newChart: Chart = new Chart(null,'',null,null);

  chartParams: ChartParam[] = [];

  isEditing = false;


  categories: Category[] = [];
  ngOnInit() {
    this.loadCategories();
    this.subscribeToCV();
    this.subscribeToSampleType();
    this.subscribeToChartParams();
    this.subscribeToChartEdition();
  }

  private subscribeToChartEdition(): void {
    this.chartService.chartToEdit$
      .subscribe(
        (chart) => {
          this.newChart = chart;
          delay(1).then(()=> M.updateTextFields());
          // load chart params
          this.loadChartParams(chart);
          this.isEditing = true;
          
        }
      )
  }

  private loadChartParams(chart: Chart): void {
    this.chartParamsService.getChartsParamsByChart(chart)
      .subscribe(
        (chartParams) => {
          chartParams.forEach(
            (chartParam) => {
              this.chartParams.push(new ChartParam(this.newChart,chartParam.param,chartParam.contextSource));              
            }            
          )
          this.chartParamsService.sendContextSourcesToEdit(this.chartParams);
        }
      )
  }

  private subscribeToChartParams(): void {
    this.chartParamsService.chartParamsToFill$
      .subscribe(
        (chartParamsArray) => {          
          this.chartParams = chartParamsArray
        }
          
      )
  }



  private subscribeToSampleType(): void {
    this.sampleTypeService.selectedSampleType$
      .subscribe(
        (sampleType) => {
          this.newChart.sampleType = sampleType
        }
      )
  }

  private subscribeToCV(): void {
    this.cvService.selectedChartCv$
      .subscribe(
        (cv) => {
          this.newChart.cv = cv;
        }
      )
  }


  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (result)=> {        
        this.loadCategoriesIntoList(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private enableSelect() {
    const elem = document.getElementById('select_categories');
    let instance = M.FormSelect.init(elem, {});    
  }

  private loadCategoriesIntoList(categories: Category[]) {
    categories.forEach(
      (category) => {
        this.categories.push(new Category(category.id,category.name));        
      }
    );
    this.selectedCategory = this.categories[0];
    this.categoryService.selectCategory(this.selectedCategory);
    delay(100).then(()=> {      
      this.enableSelect();
    });
  }

  onSubmit(): void {
    // insert the chart first
    // Check if this is an update or new chart
    console.log(this.chartParams);
    this.chartService.chartToDatabase(this.newChart, this.isEditing)
      .subscribe(
        (chart) => {
          // then insert the chart params
          this.addChartToChartParams(chart);
          this.insertChartParams(chart);
        },
        (error)=> {
          this.ModalService.openModal(new Modal(error.error.error,"Database error",'Ok',null,'newChart',null));
        }
      )
  }
  private addChartToChartParams(chart: Chart): void {
    this.chartParams.forEach(
      (chartParam) => {        
        chartParam.chart = chart;
      }
    )
  }

  private insertChartParams(chart: Chart): void {
    this.chartService.chartParamsToDatabase(chart,this.chartParams,this.isEditing)
      .subscribe(
        (chartParams) => {
          // TODO: reset form and show some success (toast )
          this.chartParamsService.resetComponents();
          M.toast({html: 'Chart saved!'});
        },
        (error) => {
          this.ModalService.openModal(new Modal(error.error.error,"Database error",'Ok',null,'newChartParams',null));
        }
      )
  }

  

}

