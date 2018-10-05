import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { View } from '../../../models/view';
import { ViewService } from '../../../services/view.service';
declare var M: any;
import { Stomp} from 'stompjs/lib/stomp.js';
import * as SockJS from 'sockjs-client';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  systems: System[] = [];

  userViews: View[] = [];

  constructor(private authService: AuthService,
    private systemService: SystemService,
    private viewService: ViewService) { }

  isAdmin = false;
  isManager = false;
  private stompClient;

  newUserView$: Subscription;

  ngOnInit() {
    if (this.authService.checkIfAdmin()) {
      this.isAdmin = true;
    }
    if (this.authService.checkRole('ROLE_MANAGER')) {
      this.isManager = true;
    }
    this.loadNodeSystems();
    this.loadUserViews();
    this.subscribeToNewUserView();
    this.initializeWebSocket();
  }

  ngOnDestroy() {
    this.newUserView$.unsubscribe();
  }

  private initializeWebSocket(): void {
    // let stompClient: any = null;
    // const socket = new SockJS('/api/gs-guide-websocket/?Authorization=' + localStorage.getItem('id_token'));
    const socket = new SockJS('/api/gs-guide-websocket');
    const stompClient = Stomp.over(socket);
    this.stompClient = stompClient;
    const headers = {
      Authorization : localStorage.getItem('id_token')
    };
    console.log(headers);
    stompClient.connect(headers, (frame) => {
        // console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/reply', function (greeting) {
            console.log(greeting);
        });
    });

  }

  sendMessage(): void {
    this.stompClient.send('/app/bye', {}, JSON.stringify({'name': 'yisuscristus'}));
  }

  private loadUserViews(): void {
    this.userViews = [];
    this.viewService.getUserViews()
      .subscribe(
        (views) => {
          this.userViews = views;
        }
      );
  }

  private loadNodeSystems(): void {
    this.systemService.getSystems()
      .subscribe(
        (systems) => {
          this.systems = systems;
        }
      );
  }

  open(dropdown): void {
    const elem = document.getElementById(dropdown);
    const instance = M.Dropdown.init(elem, {constrainWidth: false});
    instance.open();
  }

  openMobile(): void {
    const elems = document.getElementById('mobile-demo');
    const instances = M.Sidenav.init(elems, {});
  }

  doLogout(): void {
    this.authService.logout();

  }

  private subscribeToNewUserView(): void {
    this.newUserView$ = this.viewService.newUserView$
      .subscribe(
        (any) => {
          this.loadUserViews();
        }
      );
  }

}
