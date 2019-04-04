import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, private msgService: MessageService) { }
  imgUrl = 'assets/images/thumbnails/thumb';
  videoLinks = [
    {
      title: 'Getting started as a user',
      link: 'https://drive.google.com/file/d/1nHgbWmRltToAEvBF9J4_kd7k2q0mx_Pi/view?usp=sharing',
      img: this.imgUrl + 'User.png'
    },
    {
      title: 'Getting started as a lab manager',
      link: 'https://drive.google.com/file/d/10VhYb-q_Usrp-gCTVSpQf3u2fBZK7oEp/view?usp=sharing',
      img: this.imgUrl + 'LabManager.png'
    },
    {
      title: 'Thresholds and guidesets',
      link: 'https://drive.google.com/file/d/1WCmGel417NYIZiyfIFLsln98dSDNKwP4/view?usp=sharing',
      img: this.imgUrl + 'Thres.png'
    },
  ];
  message = new Message('title', 'text', 'error', false);
  ngOnInit() {
    this.retrieveMsg();
  }

  private retrieveMsg(): void {
    this.msgService.getLastMessage().subscribe(
      (msg: any) => {
        delete msg.id;
        this.message = msg;
        console.log(this.message);
      },
      (err) => {

      }
    );
  }

}
