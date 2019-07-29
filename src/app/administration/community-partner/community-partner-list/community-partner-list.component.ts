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
    )
  }

  /**
   * Emits the output to show the new line builder
   */
  public openFormEvent(): void {
    this.openForm.emit('fale');
  }
}
