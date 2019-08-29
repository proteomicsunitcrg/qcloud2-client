import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommunityService } from '../../services/community.service';
declare var M: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private communityService: CommunityService) { }

  categories = [];
  showCommunity: boolean;

  ngOnInit() {
    // get the categories for the menu
    this.getCategories();
    this.getCommunityLines();

  }

  private getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (result) => {
        result.forEach(category => this.categories.push(category));
      },
      (error) => {

      }
    );
  }
  open(item): void {
    const elem = document.getElementById(item);
    const instance = M.Collapsible.init(elem);
  }

  public getCommunityLines(): void {
    this.communityService.getCommunityLinesByNode().subscribe(
      res => {
        if(res.length >= 1) {
          this.showCommunity = true;
        } else {
          this.showCommunity = false;
        }
      },
      () => this.showCommunity = false
    );
  }
}
