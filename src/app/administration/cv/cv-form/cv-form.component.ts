import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../../../models/category';
import { CV } from '../../../models/cv';
import { CvService } from '../../../services/cv.service';
declare var M: any;

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
      private cvService: CvService) { }

  selectedCategory$: Subscription;
  selectedCategory: Category;

  cv = new CV(null, null, null, null, null, true, []);

  ngOnInit() {
    this.initializeForm();
    this.subscribeToSelectedCategory();
  }

  ngOnDestroy() {
    this.selectedCategory$.unsubscribe();
  }

  private initializeForm(): void {
    M.AutoInit();
  }

  private subscribeToSelectedCategory(): void {
    this.selectedCategory$ = this.categoryService.selectedCategory$
      .subscribe(
        (category) => {
          this.selectedCategory = category;
        }
      );
  }

  onSubmit(): void {
    this.cv.category = this.selectedCategory;
    this.cvService.addNewCv(this.cv)
      .subscribe(
        (cv) => {
          this.cvService.sendNewCvToList(cv);
        }, err => console.log(err)
      );
  }



}
