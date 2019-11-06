import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeIntranetService } from '../../../../services/node-intranet.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../../shared/ToastConfig';
import { Node } from '../../../../models/node';
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
    private toast: ToastrService
  ) { }

  node = new Node (null, null, null, null);

  labsystems = [];

  ngOnInit() {
    this.subscribeToRoute();
  }

  private subscribeToRoute(): void {
    this.route.paramMap.subscribe(
      (param)=> {
        // const apiKey = param.get('apiKey'); 
        this.getNodeByApiKey(param.get('apiKey'))
      }
    );
  }

  private getNodeByApiKey(apiKey: string): void {
    this.intrService.getNodeByApiKey(apiKey).subscribe(
      res => {
        this.node = res;
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
        this.labsystems = res
      },
      err => {
        console.error(err);
      }
    );
  }


  open(item): void {
    const elem = document.getElementById(item);
    const instance = M.Collapsible.init(elem);
  }

}
