import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-default-view',
  templateUrl: './main-default-view.component.html',
  styleUrls: ['./main-default-view.component.css']
})
export class MainDefaultViewComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute) { }

  categories: Category[] = [];
  selectedCategory: Category;

  selectedCV: CV;

  ngOnInit() {
    this.loadCategories();
    this.subscribeToCV();
  }

  private subscribeToCV(): void {
    this.cvService.selectedChartCv$
      .subscribe(
        (cv) => {
          this.selectedCV = cv;
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
  private loadCategoriesIntoList(categories: Category[]) {
    categories.forEach(
      (category) => {
        this.categories.push(new Category(category.id,category.name));        
      }
    );
    this.selectedCategory = this.categories[0];
    this.categoryService.selectCategory(this.selectedCategory);    
  }
  
  goToDefaultChartEdit(): void {
    this.router.navigate(['/application/administration/views/cv',this.selectedCV.cvid]);
  }

}
