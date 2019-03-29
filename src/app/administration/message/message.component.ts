import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    message: new FormControl('Message text. Type &lt;/br&gt;</br>to breakline')
  });
  constructor() { }
  
  ngOnInit() {
    this.enableSelect();
  }

  private enableSelect(): void {
    M.FormSelect.init(document.getElementById('typeMsg'), {});
  }

}
