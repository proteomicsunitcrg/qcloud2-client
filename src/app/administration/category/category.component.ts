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

  // Category object in the form
  category: Category = new Category(null, '', false, null);

  // Array with all categories
  categories = [];

  @ViewChild('categoryNameBox') categoryNameBox;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesFromServer();
  }

  /**
   * @summary Sends the category from the form to the server and updates the list
   * @author Daniel Mancera
   * @since 1.0.0
   * @access public
   */
  onSubmit(): void {
    this.categoryService.addNewCategory(this.category).subscribe(
      (result) => {
        this.categoryNameBox.nativeElement.classList.remove('valid');
        this.getCategoriesFromServer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * @summary Retrieves all categories from the server and fills the categories array
   *
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
  private getCategoriesFromServer() {
    this.categories = [];
    this.categoryService.getCategories().subscribe(
      (result) => {
        result.forEach(element => {
          this.categories.push(element);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * @summary Upgrades a category to main category
   * @param {Category} category
   * @author Daniel Mancera
   * @since 1.0.0
   * @access public
   */
  doMainCategory(category: Category): void {
    this.categoryService.categoryToMainCategory(category)
      .subscribe(
        (res) => {
          this.getCategoriesFromServer();
        }
      );
  }

}
