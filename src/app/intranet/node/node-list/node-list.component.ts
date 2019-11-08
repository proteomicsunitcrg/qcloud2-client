import { Component, OnInit } from '@angular/core';
import { NodeIntranetService } from '../../../services/node-intranet.service';
import { Router } from '@angular/router';
import { NodeAndStats } from '../../../models/NodeAndStats';
import { GeneralStats } from '../../../models/GeneralStats';

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

  generalStats = new GeneralStats(0,0,0,0,0,0);

  ngOnInit() {
    this.getNodes();
    this.getGeneralStats();
  }

  private getNodes(): void {
    this.nodeIntrService.getAllNodes().subscribe(
      res => this.allNodes = res.sort((a,b) => a.filesLastWeek < b.filesLastWeek ? 1 : -1),
      // res => console.log(res),
      err => console.error(err)
    );
  }

  public navigateTo(apiKey): void {
    this.router.navigate(['/application/intranet/node', apiKey]);
  }

  private getGeneralStats(): void {
    this.nodeIntrService.getGeneralStats().subscribe(
      res => {
        this.generalStats = res;
      },
      err => {
        console.error(err);
        
      }
    )
  }

}
