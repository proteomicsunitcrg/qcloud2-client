import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';
@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var elem = document.querySelector('select');
    var instance = M.Select.init(elem, {});
  }

}
