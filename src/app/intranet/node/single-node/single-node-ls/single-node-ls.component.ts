import { Component, OnInit, Input } from '@angular/core';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { LsStats } from '../../../../models/LsStats';
declare var M: any;
@Component({
  selector: 'app-single-node-ls',
  templateUrl: './single-node-ls.component.html',
  styleUrls: ['./single-node-ls.component.css']
})
export class SingleNodeLsComponent implements OnInit {

  constructor(
    private intrService: NodeIntranetService,
  ) { }
  @Input('nodeApiKey') nodeApiKey: string;
  labsystems = [];
  statsLs = new LsStats(null, null);
  showInfo = true;

  ngOnInit() {
    this.getNodeLS();
    this.initializeCollapsible();
  }

  private getNodeLS(): void {
    this.intrService.getLabsystemsByNodeApiKey(this.nodeApiKey).subscribe(
      res => {
        console.log(res);
        this.labsystems = res
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
    )
  }

  private initializeCollapsible(): void {
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems);
  }
}
