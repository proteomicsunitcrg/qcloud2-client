import { Component, OnInit, Input } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { ActivatedRoute } from '@angular/router';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-view-main',
  templateUrl: './view-main.component.html',
  styleUrls: ['./view-main.component.css']
})
export class ViewMainComponent implements OnInit {

  constructor(private viewService: ViewService,
    private route: ActivatedRoute,
    private cvService: CvService) { }

  @Input() type: string;
  
  ngOnInit() {
    if(this.type==='defaults') {
      // load charts by cv and send to the list
      this.route.params.subscribe(
        (params) =>{
          this.sendCVToList(params['id']);          
          
        }
      )


    }else {
      // load datasources owned by the node
    }
  }

  private sendCVToList(cvId: string): void {
    //get the cv from server
    this.cvService.getCvByCvId(cvId)
      .subscribe(
        (cv) => {
          // send to list
          this.viewService.sendCVToChartLayoutList(cv);
        },
        (error)=> {
          console.log(error)
        }
      )
  }
}
