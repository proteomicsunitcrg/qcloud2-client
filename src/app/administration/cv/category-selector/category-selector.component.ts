import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { delay } from 'q';
@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

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
    let instance = M.Select.init(elem, {});    
  }

  private loadCategories(categories: Category[]) {
    categories.forEach(
      (category) => {
        this.categories.push(new Category(category.id,category.name));
      }
    );
    delay(100).then(()=> {
      this.enableSelect();
    });
  }

}
