import { Component, OnInit, Input } from '@angular/core';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { LsStats } from '../../../../models/LsStats';
import { ActivatedRoute } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-single-node-ls',
  templateUrl: './single-node-ls.component.html',
  styleUrls: ['./single-node-ls.component.css']
})
export class SingleNodeLsComponent implements OnInit {

  constructor(
    private intrService: NodeIntranetService, private activatedRoute: ActivatedRoute  ) { }
  @Input('nodeApiKey') nodeKey: string;
  labsystems = [];
  statsLs = new LsStats(null, null);
  showInfo = true;

  ngOnInit() {
    this.getNodeLS();
  }

  private getNodeLS(): void {
    this.intrService.getLabsystemsByNodeApiKey(this.nodeKey).subscribe(
      res => {
        this.labsystems = res;
        this.initializeCollapsible();
        this.getRoute();
      },
      err => {
        console.error(err);
      }
    );
  }

  public hideLsInfoAndGetLsStats(apiKey: string): void {
    this.showInfo = !this.showInfo;
    if (!this.showInfo) {
      this.getLsStats(apiKey);
    }
  }
  public getLsStats(lsApiKey: string): void {
    this.intrService.getLsStats(lsApiKey).subscribe(
      res => {
        this.statsLs = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  private initializeCollapsible(): void {
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems);
  }

  private getRoute(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let lsApiKey = params['lsApiKey'];
      if (lsApiKey === undefined) {
        console.log('NADA');
      } else {
        setTimeout(() => {
          const item = document.getElementById(`collapsible${lsApiKey}`);
          console.log(item);
          item.style.setProperty('background-color', 'red');
        }, 1000);

      }
    });
  }
}
