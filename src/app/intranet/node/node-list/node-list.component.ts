import { Component, OnInit } from '@angular/core';
import { NodeIntranetService } from '../../../services/node-intranet.service';
import { Node } from '../../../models/node';
import { Router } from '@angular/router';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent implements OnInit {

  constructor(
    private nodeIntrService: NodeIntranetService,
    private router: Router,
  ) { }

  allNodes: Node[]

  ngOnInit() {
    this.getNodes();
  }

  private getNodes(): void {
    this.nodeIntrService.getAllNodes().subscribe(
      res => this.allNodes = res,
      err => console.error(err)
    );
  }

  public navigateTo(apiKey): void {
    console.log(apiKey);
    this.router.navigate(['/application/intranet/node', apiKey]);
  }

}
