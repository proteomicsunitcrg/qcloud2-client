import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
import { AuthService } from '../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from 'src/app/shared/ToastConfig';

@Component({
  selector: 'app-user-view-list',
  templateUrl: './user-view-list.component.html',
  styleUrls: ['./user-view-list.component.css']
})
export class UserViewListComponent implements OnInit {

  constructor(private router: Router,
    private viewService: ViewService,
    private authService: AuthService,
    private toast: ToastrService) { }

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
          console.log(views);
          console.log(this.isManager);
          
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

  public updateShare(view: View): void {
    this.viewService.updateShare(view).subscribe(
      res => {
        if (res.isShared) {
          this.toast.success(`The view ${res.name} is shared with the node members`, `Sharing`, TOASTSETTING)
        } else {
          this.toast.success(`The view ${res.name} is no longer shared with the node members`, `Not sharing`, TOASTSETTING)
        }
        this.loadUserViews();
      },
      err => {
        console.error(err);
      }
    )
  }

}
