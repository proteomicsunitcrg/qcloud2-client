import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';
import { Node } from '../../../../models/node';
import { LsStats } from '../../../../models/LsStats';
import { NodeStats } from '../../../../models/NodeStats';
declare var M: any;

@Component({
  selector: 'app-single-node-view',
  templateUrl: './single-node-view.component.html',
  styleUrls: ['./single-node-view.component.css']
})
export class SingleNodeViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private intrService: NodeIntranetService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  node = new Node (null, null, null, null);
  nodeStats = new NodeStats(0, 0, 0, 0);
  labsystems = [];
  statsLs = new LsStats(null, null);
  showInfo = true;
  ngOnInit() {
    this.subscribeToRoute();
    this.initializeCollapsible();
  }

  private initializeCollapsible(): void {
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems);
  }

  private subscribeToRoute(): void {
    this.route.paramMap.subscribe(
      (param)=> {
        // const apiKey = param.get('apiKey'); 
        this.getNodeByApiKey(param.get('apiKey'));
      }
      );
    }
    
    private getNodeByApiKey(apiKey: string): void {
      this.intrService.getNodeByApiKey(apiKey).subscribe(
        res => {
          this.node = res;
          this.getNodeStats(this.node.apiKey);
          this.getNodeLS(this.node.apiKey);
      },
      err => {
        this.toast.error(err.error.message, 'Node not found', TOASTSETTING);
        console.log(err);
      }
    );
  }

  private getNodeLS(nodeApiKey: string): void {
    this.intrService.getLabsystemsByNodeApiKey(nodeApiKey).subscribe(
      res => {
        console.log(res);
        this.labsystems = res
      },
      err => {
        console.error(err);
      }
    );
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

  private getNodeStats(nodeApiKey: string): void {
    this.intrService.getNodeStats(nodeApiKey).subscribe(
      res => {
        this.nodeStats = res;
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

  public goBack() {
    this.router.navigate(['/application/intranet/nodes']);
  }
}
