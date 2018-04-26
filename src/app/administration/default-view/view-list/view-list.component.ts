import { Component, OnInit } from '@angular/core';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  constructor(private viewService: ViewService,
    private router: Router) { }

  defaultViews: View[] = [];

  ngOnInit() {
    // load views
    this.loadDefaultViews();
  }

  private loadDefaultViews(): void {
    this.viewService.getDefaultViews()
      .subscribe(
        (defaultViews)=> {
          this.defaultViews = defaultViews;
        }
      )
  }

  editView(view: View): void {
    this.router.navigate(['/application/administration/views/cv',view.cv.cvid,view.sampleTypeCategory.id]);
  }

}
