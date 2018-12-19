import { Component, OnInit } from '@angular/core';
import { PlotService } from '../../../services/plot.service';

@Component({
  selector: 'app-data-visualization-side-menu',
  templateUrl: './data-visualization-side-menu.component.html',
  styleUrls: ['./data-visualization-side-menu.component.css']
})
export class DataVisualizationSideMenuComponent implements OnInit {

  constructor(private plotService: PlotService) { }

  menu = true;

  ngOnInit() {
    this.subscribeToPlotClick();
  }

  switch(event: any): void {
    this.menu = !this.menu;
  }

  private subscribeToPlotClick(): void {
    this.plotService.dateFromPlot$
      .subscribe(
        (date) => {
          this.menu = false;
        }
      );
  }

}
