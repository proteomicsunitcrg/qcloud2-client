import { Component, OnInit } from '@angular/core';
import { NodeIntranetService } from '../../../services/node-intranet.service';
import { Router } from '@angular/router';
import { NodeAndStats } from '../../../models/NodeAndStats';

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

  allNodes: NodeAndStats[];

  ngOnInit() {
    this.getNodes();
  }

  private getNodes(): void {
    this.nodeIntrService.getAllNodes().subscribe(
      res => this.allNodes = res.sort((a,b) => a.filesLastWeek < b.filesLastWeek ? 1 : -1),
      err => console.error(err)
    );
  }

  public navigateTo(apiKey): void {
    this.router.navigate(['/application/intranet/node', apiKey]);
  }

}
