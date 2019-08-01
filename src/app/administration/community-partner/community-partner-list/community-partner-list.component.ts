import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommunityPartnerService } from '../../../services/community-partner-service';
import { CommunityPartner } from '../../../models/CommunityPartner';

@Component({
  selector: 'app-community-partner-list',
  templateUrl: './community-partner-list.component.html',
  styleUrls: ['./community-partner-list.component.css']
})
export class CommunityPartnerListComponent implements OnInit {

  constructor(private partnerService: CommunityPartnerService) { }

  partners: CommunityPartner[] = [];
  // Output to emit to show new line form
  @Output() openForm: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.getAll();
  }


  private getAll(): void {
    this.partnerService.getAll().subscribe(
      result => this.partners = result,
      error => console.error(error)
    );
  }

  /**
   * Emits the output to show the new line builder
   */
  public openFormEvent(edit: boolean, id?: number): void {
    if (edit) {
      this.openForm.emit(id.toString());
      console.log('edit');
    } else {
      this.openForm.emit('noEdit');
      console.log('noEdit');
    }
  }

  private deletePartner(id: number) {
    this.partnerService.deletePartner(id).subscribe(
      res => this.getAll(),
      err => console.error(err)
    );
  }
}
