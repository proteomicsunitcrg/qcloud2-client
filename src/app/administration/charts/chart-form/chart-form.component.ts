import { Component, OnInit } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import * as M from 'materialize-css/dist/js/materialize';
import { delay } from 'q';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css']
})
export class ChartFormComponent implements OnInit {

  constructor(private cvService: CvService,
    private categoryService: CategoryService) { }

  selectedCategory: Category;
  cvs: CV[] = [];

  categories: Category[] = [];
  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (result)=> {        
        this.loadCategories(result);
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
  private loadCategories(categories: Category[]) {
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


}

