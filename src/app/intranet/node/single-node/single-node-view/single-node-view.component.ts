import { Component, OnInit, Input } from '@angular/core';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';
import { Node } from '../../../../models/node';
import { NodeStats } from '../../../../models/NodeStats';

@Component({
  selector: 'app-single-node-view',
  templateUrl: './single-node-view.component.html',
  styleUrls: ['./single-node-view.component.css']
})
export class SingleNodeViewComponent implements OnInit {

  constructor(
    private intrService: NodeIntranetService,
    private toast: ToastrService,
  ) { }

  node = new Node(null, null, null, null);
  nodeStats = new NodeStats(0, 0, 0, 0);

  @Input('nodeApiKey') nodeKey: string;

  ngOnInit() {
    this.getNodeByApiKey();
  }

  private getNodeByApiKey(): void {
    this.intrService.getNodeByApiKey(this.nodeKey).subscribe(
      res => {
        this.node = res;
        this.getNodeStats(this.node.apiKey);
      },
      err => {
        this.toast.error(err.error.message, 'Node not found', TOASTSETTING);
      }
    );
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

}
