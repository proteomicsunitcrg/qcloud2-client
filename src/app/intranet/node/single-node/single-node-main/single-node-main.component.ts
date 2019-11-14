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
  ) { }

  showLabsystems = true;
  routeUrl: string;
  ngOnInit() {
    this.subscribeToRoute();
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

}
