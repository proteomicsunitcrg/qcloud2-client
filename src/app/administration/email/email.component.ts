import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EmailService } from '../../services/email.service';
import { Email } from '../../models/email';
declare let M: any;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {

  // This variable is used to access the toast methods
  M: any;

  // To get the selected users from the list
  @ViewChild(ContactListComponent) child;

  // Array to store the selected users
  selectedUsers = [];

  // Email form with validations
  emailForm = new FormGroup({
    title: new FormControl('Email subject', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    body: new FormControl('Email body', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(300)
    ])
  });

  constructor(private emailService: EmailService) { }
  /**
  * @summary Get all the selected users from the event
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  receiveMessage($event) {
    this.selectedUsers = $event;
  }

  /**
  * @summary Submits the email to the API
  * @description One petition per user, sends the email and show a cool toast with the result
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  submit(): void {
    M.toast({ html: 'Sending the email' });
    for (const user of Object.keys(this.selectedUsers)) {
      const email = new Email('qcloud@crg.eu', this.selectedUsers[user], this.emailForm.value.title, this.emailForm.value.body);
      this.emailService.sendEmail(email).subscribe(
        (result) => {
          if (result) {
            M.toast({ html: 'Email send to ' + this.selectedUsers[user] });
          } else {
            M.toast({ html: 'Error sending the email to to ' + this.selectedUsers[user] });
          }
        }, (error) => {
          M.toast({ html: 'Error sending the email to to ' + this.selectedUsers[user] });
        }
      );
    }
  }

}
