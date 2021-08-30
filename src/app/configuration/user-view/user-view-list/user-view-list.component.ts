import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';

@Component({
  selector: 'app-user-view-list',
  templateUrl: './user-view-list.component.html',
  styleUrls: ['./user-view-list.component.css']
})
export class UserViewListComponent implements OnInit {

  constructor(private router: Router,
    private viewService: ViewService,
    private authService: AuthService,
    private toast: ToastrService,

    ) { }

  userViews: View[] = [];

  isManager = false;


  ngOnInit() {
    if (this.authService.checkRole('ROLE_MANAGER')) {
      this.isManager = true;
    }
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
    alert('Method not enabled in demo version');
    return;
    this.router.navigate(['application/configuration/builder/edit', view.apiKey]);
  }

  deleteView(view: View): void {
    alert('Method not enabled in demo version');
    return;
    this.viewService.deleteView(view).subscribe(
      (result) => {
        this.loadUserViews();
      }, (error) => {
        console.log(error);
      }
    );
  }

}
