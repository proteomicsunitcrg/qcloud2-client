import { Component, OnInit } from '@angular/core';
import { NodeIntranetService } from '../../../services/node-intranet.service';
import { GeneralStats } from '../../../models/GeneralStats';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.css']
})
export class GeneralStatsComponent implements OnInit {

  constructor(
    private nodeIntrService: NodeIntranetService,
  ) { }

  generalStats = new GeneralStats(0, 0, 0, 0, 0, 0, 0);

  ngOnInit() {
    this.getGeneralStats();
  }
  private getGeneralStats(): void {
    this.nodeIntrService.getGeneralStats().subscribe(
      res => {
        this.generalStats = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
