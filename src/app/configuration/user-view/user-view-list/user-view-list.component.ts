import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';

@Component({
  selector: 'app-user-view-list',
  templateUrl: './user-view-list.component.html',
  styleUrls: ['./user-view-list.component.css']
})
export class UserViewListComponent implements OnInit {

  constructor(private router: Router,
    private viewService: ViewService) { }

  userViews: View[] = [];

  ngOnInit() {
    this.loadUserViews();
  }

  private loadUserViews(): void {
    this.viewService.getUserViews()
      .subscribe(
        (views) => {
          this.userViews = views;
        }
      );
  }


  goUserViewBuilder(): void {
    this.router.navigate(['application/configuration/builder']);
  }

  editView(view: View): void {
    this.router.navigate(['application/configuration/builder/edit', view.apiKey]);
  }

  deleteView(view: View): void {
    this.viewService.deleteView(view).subscribe(
      (result) => {
        this.loadUserViews();
      }, (error) => {
        console.log(error);
      }
    );
  }

}
