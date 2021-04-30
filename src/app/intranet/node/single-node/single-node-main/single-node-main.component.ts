import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviousRouteService } from '../../../../services/PreviousRoute.service';

@Component({
  selector: 'app-single-node-main',
  templateUrl: './single-node-main.component.html',
  styleUrls: ['./single-node-main.component.css']
})
export class SingleNodeMainComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private previousRouteService: PreviousRouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  showLabsystems = true;
  routeUrl: string;
  ngOnInit() {
    this.subscribeToRoute();
    this.subscribeToShowUser();
  }

  private subscribeToRoute(): void {
    this.route.paramMap.subscribe(
      (param) => {
        this.routeUrl = param.get('apiKey');
      }
    );
  }

  public goBack() {
    if (this.previousRouteService.getPreviousUrl() === this.previousRouteService.getCurrentUrl()) {
      this.router.navigate(['/application/intranet/nodes']);
    } else {
      this.router.navigate([this.previousRouteService.getPreviousUrl()]);
    }
  }

  private subscribeToShowUser() {
    this.activatedRoute.queryParams.subscribe(params => {
      let userApiKey = params['userApiKey'];
      if (userApiKey === undefined) {
        console.log('NADA USER');
      } else {
        this.showLabsystems = false;
        setTimeout(() => {
          const item = document.getElementById(userApiKey);
          if (item != null) {
            item.style.setProperty('background-color', 'red');
            item.scrollIntoView({behavior: 'smooth', block: 'center'});
          }
        }, 1000);

      }
    });
  }

}
