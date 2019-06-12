import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { WebsocketService } from '../../../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer, private msgService: MessageService, private webSocketService: WebsocketService) { }
  imgUrl = 'assets/images/thumbnails/thumb';
  videoLinks = [
    {
      title: 'Getting started as a user',
      link: 'https://www.dropbox.com/s/e2mil82vuccvcox/getting-started-as-user.mp4',
      img: this.imgUrl + 'User.png'
    },
    {
      title: 'Getting started as a lab manager',
      link: 'https://www.dropbox.com/s/5xani1zi7guqez7/getting-started-as-a-lab-manager.mp4',
      img: this.imgUrl + 'LabManager.png'
    },
    {
      title: 'Thresholds and guidesets',
      link: 'https://www.dropbox.com/s/tqn83u22m7fs1tw/threholds-and-guidesets.mp4',
      img: this.imgUrl + 'Thres.png'
    },
  ];
  message = new Message('title', 'text', 'error', false);
  messageFromWebSocket$: Subscription;
  ngOnInit() {
    this.retrieveMsg();
    this.subscribeToWebSocketMessage();
  }

  private subscribeToWebSocketMessage(): void {
    this.messageFromWebSocket$ = this.webSocketService.updateMessageFromWebSocket$
      .subscribe((res) => {
        this.message = res.body;
      });
  }

  private retrieveMsg(): void {
    this.msgService.getLastMessage().subscribe(
      (msg: any) => {
        delete msg.id;
        this.message = msg;
      },
      (err) => {

      }
    );
  }

}
