import { Component, OnInit, ViewChild } from '@angular/core';
import { Category} from '../../models/category';
import { CategoryService } from '../../services/category.service';
/**
 * Category component for the controlled vocabulary
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  category: Category = new Category(null,'',false);

  categories = [];
  
  @ViewChild("categoryNameBox") categoryNameBox;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesFromServer();
  }


  onSubmit(): void {
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

  doMainCategory(category: Category): void {
    this.categoryService.categoryToMainCategory(category)
      .subscribe(
        (res) => {
          this.getCategoriesFromServer();
        }
      );
  }

}
