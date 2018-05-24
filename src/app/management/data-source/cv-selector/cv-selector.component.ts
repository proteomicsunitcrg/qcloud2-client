import { Component, OnInit, OnDestroy } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { Category } from '../../../models/category';
import { Subscription } from 'rxjs/Subscription';
import { CV } from '../../../models/cv';
import { DataSource } from '../../../models/dataSource';
import { DataSourceService } from '../../../services/data-source.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-cv-selector',
  templateUrl: './cv-selector.component.html',
  styleUrls: ['./cv-selector.component.css']
})
export class CvSelectorComponent implements OnInit,OnDestroy {

  constructor(private cvService: CvService,
    private categoryService: CategoryService,
    private dataSourceService: DataSourceService,
    private route: ActivatedRoute,
    private router: Router) { }

  cvList = [];

  limit = 10;

  page = 1;

  maxPages: number;

  filter: CV = new CV(null, '', null, '', '', false);

  selectedCategory$: Subscription;

  ngOnInit() {
    // get all enabled cvs
    this.selectedCategory$ = this.categoryService.selectedCategory$
      .subscribe(
        (category) => {
          this.getEnabledCvsByCategory(category);
        }
      )
  }
  ngOnDestroy() {
    this.selectedCategory$.unsubscribe();
  }

  private getEnabledCvsByCategory(category: Category): void {
    this.cvService.getAllEnabledCVByCategory(category).subscribe(
      (result) => {
        this.cvList = [];
        this.maxPages = result.length / 10;
        result.forEach(cv => this.cvList.push(cv));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addInstrument(cv: CV): void {
    // Create datasource
    let dataSource: DataSource = new DataSource(null, 'my-' + cv.name, cv, null,'',true);

    this.dataSourceService.addNewDataSource(dataSource).subscribe(
      (result) => {
        this.dataSourceService.reloadDataSourceList();
      },
      (error) => {
        console.log(error);
      }
    );


  }

}
