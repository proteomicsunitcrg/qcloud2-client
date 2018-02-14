import { Component, OnInit, ViewChild } from '@angular/core';

import { Category} from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  private category: Category = new Category(null,'');

  private categories = [];

  @ViewChild("categoryNameBox") categoryNameBox;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesFromServer();
  }


  onSubmit(): void {
    console.log(this.category);
    
    this.categoryService.addNewCategory(this.category).subscribe(
      (result)=> {
        this.categoryNameBox.nativeElement.classList.remove("valid");
        this.getCategoriesFromServer();        
      },
      (error)=> {
        console.log(error);
      }
    )    
  }

  private getCategoriesFromServer() {
    this.categories = [];
    this.categoryService.getCategories().subscribe(
      (result)=> {
        result.forEach(element => {
          this.categories.push(element);
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
