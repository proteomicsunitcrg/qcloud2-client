import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../shared/ToastConfig';
declare let M: any;
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  // Var to launch the Toast
  M: any;
  // The formulary with restrictions
  messageForm = new FormGroup({
    title: new FormControl('Message title', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]),
    message: new FormControl('Message text. Type &lt;/br&gt;</br>to breakline'),
    type: new FormControl(null, [
      Validators.required
    ]),
    show: new FormControl(false, [
      Validators.required
    ])
  });
  constructor(private msgService: MessageService, private toastr: ToastrService) { }

  ngOnInit() {
    this.enableSelect();
    this.subscribeToMessage();
  }

  /**
   * @summary Retreives all the messages from the database
   * @description Retreives all the messages from the database,
   * if the array isn't empty updates the form otherwise shows a toast with the error
   * @author Marc Serret
   * @since 1.0.1
   * @access private
   */
  private subscribeToMessage(): void {
    this.msgService.getAllMessages().subscribe(
      (msg) => {
        if (Array.isArray(msg) && msg.length) {
          this.mountForm(msg[msg.length - 1]);
        } else {
          this.toastr.error('Error retrieving the message', null, TOASTSETTING);
        }
      },
      () => this.toastr.error('Error retrieving the message', null, TOASTSETTING)
    );
  }

  /**
   * @summary Updates the form with the retrieved data from th database
   *
   * @author Marc Serret
   * @since 1.0.1
   * @access private
   * @param {object} msg The message retrieved from the database
   */
  private mountForm(msg: any): void {
    this.messageForm.controls.title.setValue(msg.title);
    this.messageForm.controls.message.setValue(msg.message);
    this.messageForm.controls.type.setValue(msg.messageType);
    this.messageForm.controls.show.setValue(msg.show);
  }

  /**
   * @summary Send the new message to the service, triggered when submit button is clicked
   *
   * @author Marc Serret
   * @since 1.0.0
   * @access public
   */
  public submit(): void {
    const msg = new Message(this.messageForm.value.title, this.messageForm.value.message,
      this.messageForm.value.type, this.messageForm.value.show);
    this.msgService.saveMessage(msg).subscribe(
      () => this.toastr.success('Message updated', null, TOASTSETTING),
      () => this.toastr.error('Error while updating the message', null, TOASTSETTING),
    );
  }

  /**
   * @summary Enables the select
   *
   * @author Marc Serret
   * @since 1.0.0
   * @access private
   */
  private enableSelect(): void {
    M.FormSelect.init(document.getElementById('typeMsg'), {});
  }

}
