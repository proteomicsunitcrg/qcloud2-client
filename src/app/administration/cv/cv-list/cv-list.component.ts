import { Component, OnInit } from '@angular/core';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { Subscription } from 'rxjs/Subscription';
import { ModalService} from '../../../modal-module/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Modal } from '../../../models/modal';
import { ModalResponse } from '../../../models/modalResponse';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit {

  private modalSubscription$: Subscription;

  constructor(private cvService: CvService,
    private modalService: ModalService) { }

  cvs = [];

  limit = 10;

  page = 1;

  maxPages: number;

  filter: CV = new CV(null,'',null,'','',false);

  ngOnInit() {
    this.getCvListFromServer();
    this.modalSubscription$ = this.modalService.selectedAction$.subscribe((action) => {
      console.log(action);
    });
  }

  changeStatus(cv: CV) {
    this.cvService.changeEnabled(cv.id).subscribe(
      (result)=> {
        cv.enabled = result.enabled;
      },
      (error)=> {
        this.showModalByError(error);
      }
    );    
  }

  private showModalByError(error: HttpErrorResponse) {    
    let errorCode = error.error.status;
    switch (errorCode) {
      case 409:
      this.modalService.openModal(new Modal("maldito",
        "muy mucho maldito", 'Ok', '', 'changecvstatus',null));
      /*  
      this.modalService.openModal(new Modal(error.error.error,
          error.error.message, 'Ok', '', 'addnewmember',null));
      */
          break;
      default:
        this.modalService.openModal(new Modal('Server error',
          'There is a problem with the server. Try again later.', 'Ok', '', 'changecvstatus',null));
        break;
    }

  }



  private getCvListFromServer() {
    this.cvs = [];
    this.cvService.getAllCV().subscribe(
      (result)=> {
        this.maxPages = result.length/10;        
        result.forEach(cv=> {          
          this.cvs.push(cv);
        })
      },
      (error)=> {
        console.log(error);
      }
    )

  }

}
