import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css']
})
export class DataSourceComponent implements OnInit {

  constructor(private categoryService: CategoryService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.categoryService.setCurrentCategory(this.route.paramMap.pipe(switchMap((params: ParamMap) =>
        this.categoryService.getCategoryByName(params.get('name')))));
  }

}
