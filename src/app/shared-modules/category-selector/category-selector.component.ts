import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { delay } from 'q';
declare var M: any;

/**
 * Category selector component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories: Category[] = [];

  selectedCategory: Category;

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

  changeSelection() {
    this.categoryService.selectCategory(this.selectedCategory);
  }

  private enableSelect() {
    const elem = document.getElementById('select_categories');
    let instance = M.FormSelect.init(elem, {});    
  }

  private loadCategories(categories: Category[]) {
    categories.forEach(
      (category) => {
        this.categories.push(new Category(category.id,category.name,category.isMain));
      }
    );
    this.selectedCategory = this.categories[0];
    this.categoryService.selectCategory(this.selectedCategory);
    delay(100).then(()=> {      
      this.enableSelect();
    });
  }

}
