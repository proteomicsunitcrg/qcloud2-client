import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() dataFromParent: string;

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
  });

  ngOnInit() {
    console.log(this.dataFromParent);
    if (this.isEdition()) {
      this.getDataToEdit();
    }
  }

  /**
  * @summary if dataFromParent is "noEdit" returns false, else true
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @returns {boolean} with true if is edition or false otherwise
  */
  private isEdition(): boolean {
    if (this.dataFromParent === 'noEdit') {
      return false;
    } else {
      return true;
    }
  }
  /**
  * @summary if dataFromParent is "noEdit" returns false, else true
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @returns {boolean} with true if is edition or false otherwise
  */
  private getDataToEdit(): any {
    this.partnerService.getDataToEdit(parseInt(this.dataFromParent)).subscribe(
      result => {
        this.mountForm(result);
        console.log(result);
      },
      err => console.error(err)
    );
  }
  mountForm(result: CommunityPartner) {
    this.partnerForm.controls.name.setValue(result.name);
    this.partnerForm.controls.email.setValue(result.email);
    this.partnerForm.controls.logo.setValue(result.logo);
    this.partnerForm.controls.website.setValue(result.webPage);
  }

  private submit(): void {
    const newPartner = new CommunityPartner(this.partnerForm.value.email, null,
      this.partnerForm.value.logo, this.partnerForm.value.name, this.partnerForm.value.website);
    if (this.isEdition()) {
      newPartner.id = parseInt(this.dataFromParent);
    }
    console.log(newPartner);
    this.partnerService.createNew(newPartner).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.error(error);
      }
    );
  }

  private closeFormEvent(): void {
    this.closeForm.emit('emit');
  }

}
