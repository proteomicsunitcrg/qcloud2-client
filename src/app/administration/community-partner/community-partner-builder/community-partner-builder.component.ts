import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommunityPartnerService } from '../../../services/community-partner-service';
import { CommunityPartner } from '../../../models/CommunityPartner';

@Component({
  selector: 'app-community-partner-builder',
  templateUrl: './community-partner-builder.component.html',
  styleUrls: ['./community-partner-builder.component.css']
})
export class CommunityPartnerBuilderComponent implements OnInit {
  constructor(private partnerService: CommunityPartnerService) { }

  @Output() closeForm: EventEmitter<String> = new EventEmitter<String>();
  partnerForm = new FormGroup({
    name: new FormControl('Name', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    email: new FormControl('Email', [
      Validators.email,
      Validators.required
    ]),
    logo: new FormControl('Logo', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(75)
    ]),
    website: new FormControl('Web site', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50)
    ])
  })

  ngOnInit() {
  }

  private submit(): void {
    const newPartner = new CommunityPartner(this.partnerForm.value.email, null,
      this.partnerForm.value.logo, this.partnerForm.value.name, this.partnerForm.value.website);
    this.partnerService.createNew(newPartner).subscribe(
      result =>{
        console.log(result);
      },
      error => {
        console.error(error);
      }
    );
  }

  private closeFormEvent(): void {
    this.closeForm.emit("emit");
  }

}
