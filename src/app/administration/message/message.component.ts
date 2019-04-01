import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import {Message} from '../../models/message'
import {MessageService} from '../../services/message.service'
declare let M: any;
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  M: any;
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
  constructor(private msgService: MessageService) { }
  
  ngOnInit() {
    this.enableSelect();
    this.subscribeToMessage();
  }
  /**
   * @summary Retreives all the messages from the database
   * @description Retreives all the messages from the database, if the array isn't empty updates the form otherwise shows a toast with the error
   * @author Marc Serret
   * @since 1.0.1
   * @access private  
   */
  private subscribeToMessage() {
    this.msgService.getAllMessages().subscribe(
      (msg) => {
        if(Array.isArray(msg) && msg.length){
          this.mountForm(msg[msg.length - 1]);
        } else {
          M.toast({html: 'Error retrieving the message'});
        }
      }, (err) => {
        M.toast({html: 'Error retrieving the message'});
      }
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
  private mountForm(msg :any) :void {
    this.messageForm.controls.title.setValue(msg.title);
    this.messageForm.controls.message.setValue(msg.message);
    this.messageForm.controls.type.setValue(msg.messageType);
    this.messageForm.controls.show.setValue(msg.show);
  }

  submit() {
    const msg = new Message(this.messageForm.value.title, this.messageForm.value.message,this.messageForm.value.type, this.messageForm.value.show);
    this.msgService.saveMessage(msg).subscribe(
      (msg) => {
        M.toast({html: 'Message updated'});
      }, (err) => {
        M.toast({html: 'Error while updating the message'});
      }
    );
  }

  private enableSelect(): void {
    M.FormSelect.init(document.getElementById('typeMsg'), {});
  }

}
