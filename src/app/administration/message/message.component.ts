import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { EmailService } from '../../services/email.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../shared/ToastConfig';
import { Email } from 'src/app/models/email';
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
      Validators.maxLength(60),
    ]),
    message: new FormControl('Message text. Type &lt;/br&gt;</br>to breakline'),
    type: new FormControl(null, [
      Validators.required
    ]),
    show: new FormControl(false, [
      Validators.required
    ]),
    priority: new FormControl(0, [
      Validators.required,
    ])
  });

  allMessages: Message[] = [];

  currentMessage: Message;

  constructor(private msgService: MessageService, private toastr: ToastrService,
    private mailService: EmailService, ) { }

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
          this.allMessages = msg;
          console.log(msg);
          this.currentMessage = msg[0];
          this.mountForm(msg[0]);
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
  private mountForm(msg: Message): void {
    this.messageForm.controls.title.setValue(msg.title);
    this.messageForm.controls.message.setValue(msg.message);
    this.messageForm.controls.type.setValue(msg.type);
    this.messageForm.controls.show.setValue(msg.show);
    this.messageForm.controls.priority.setValue(msg.priority);
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
      this.messageForm.value.type, this.messageForm.value.show, null);
    msg.priority = this.messageForm.value.priority;
    console.log(msg);
    if (this.currentMessage != undefined) {
      msg.id = this.currentMessage.id;
    }
    this.msgService.saveMessage(msg).subscribe(
      () => {
        this.toastr.success('Message updated', null, TOASTSETTING);
        this.subscribeToMessage();
      },
      () => this.toastr.error('Error while updating the message', null, TOASTSETTING),
    );
  }
  /**
   * @summary Send the new message all users as spam
   *
   * @author Marc Serret
   * @since 1.0.0
   * @access public
   */
  public spamAll(): void {
    const email = new Email('qcloud2@crg.eu', null,
      this.messageForm.value.title, this.messageForm.value.message);
    this.mailService.sendSpam(email).subscribe(
      () => this.toastr.success('Message send to all users', 'Success', TOASTSETTING),
      () => this.toastr.error('Error while sending the message', 'Error', TOASTSETTING)
    );
  }

  /**
   * @summary Send the new message all users as spam
   *
   * @author Marc Serret
   * @since 1.0.0
   * @access public
   */
  public spamAllManagers(): void {
    const email = new Email('qcloud2@crg.eu', null,
      this.messageForm.value.title, this.messageForm.value.message);
    this.mailService.sendSpamManagers(email).subscribe(
      () => this.toastr.success('Message send to all managers', 'Success', TOASTSETTING),
      () => this.toastr.error('Error while sending the message', 'Error', TOASTSETTING)
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

  public newMsg(): void {
    this.currentMessage = undefined;
    this.messageForm.controls.title.setValue('');
    this.messageForm.controls.message.setValue('');
    this.messageForm.controls.type.setValue('');
    this.messageForm.controls.show.setValue(false);
    this.messageForm.controls.priority.setValue(0);
  }

  public goToMessage(msg: Message): void {
    this.currentMessage = msg;
    this.mountForm(msg);
  }

  public deleteMSG(): void {
    console.log(this.currentMessage);
    this.msgService.deleteMessage(this.currentMessage).subscribe(
      res => {
        if(res) {
          this.toastr.success('Message deleted', 'Success', TOASTSETTING);
          this.subscribeToMessage();
        } else {
          this.toastr.success('Error deleting the message', 'Error', TOASTSETTING);
        }
      },
      err => {
        this.toastr.success('Error deleting the message', 'Error', TOASTSETTING);
      }
    );
  }

}
