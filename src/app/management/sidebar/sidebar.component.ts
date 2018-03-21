import { Component, OnInit } from '@angular/core';
//import * as M from 'materialize-css/dist/js/materialize';
import { CategoryService } from '../../services/category.service';
declare var M: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categories = [];

  ngOnInit() {
    // get the categories for the menu
    this.getCategories();

  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (result) => {
        result.forEach(category=> this.categories.push(category));
      },
      (error) => {

      }
    )
  }


  open(item) : void {    
    var elem = document.getElementById(item);
    var instance = M.Collapsible.init(elem);
  }

}
