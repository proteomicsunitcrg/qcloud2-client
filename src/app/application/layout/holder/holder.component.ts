import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadTestPlot();
  }
  private loadTestPlot(): void {
    let datesArray = [];
    let dataArray = [];
    
    this.dataService.getTestData()
      .subscribe(
        (dataFromServer) => {
          Object.keys(dataFromServer).forEach(function (key) {
            datesArray.push(key);
            Object.keys(dataFromServer[key]).forEach(
              (element) => {
                if(dataArray[element]==undefined) {
                  dataArray[element] = [];
                }
                dataArray[element].push(dataFromServer[key][element]);
              }
            )
         });
        },(e) => console.log(e),
        () => this.loadPlot(datesArray,dataArray)

      )
      
  }
  private loadPlot(datesArray, dataArray): void {
    console.log(dataArray);
  }

}
