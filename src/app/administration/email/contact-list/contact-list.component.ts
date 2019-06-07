import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailService } from '../../../services/email.service';
import { UserService } from '../../../services/user.service';

declare var M: any;
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  allNodes = [];
  hola = [];
  selected = [];
  constructor(private emailService: EmailService, private userService: UserService) { }
  @Output() contactEmitter = new EventEmitter<any>();
  ngOnInit() {
    this.getAllNodes();
  }
  /**
  * @summary Manage the selection
  * @description Add the element to selected list or removes it
  * @param i position of the element in the list
  * @typeparam i number
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  public onSelect(): void {
    this.selected = [];
    setTimeout(() => {  // The timeout is necessary because the checkbox isnt instant
      for (const nodeFather of this.allNodes) {
        for (const user of nodeFather.node.users) {
          if (user.checked) {
            this.selected.push(user.username);
          }
        }
      }
      this.emitList();
    }, 100);

  }
  /**
  * @summary Add all the users to the selected array
  * @description Add all the users to the selected array, also emits the list
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  public selectAll() {
    this.selected = [];
    setTimeout(() => {  // The timeout is necessary because the checkbox isnt instant
      for (const nodeFather of this.allNodes) {
        for (const user of nodeFather.node.users) {
          user.checked = true;
          if (user.checked) {
            this.selected.push(user.username);
          }
        }
      }
      this.emitList();
    }, 100);
  }

  /**
  * @summary Remove all the users from the selected array
  * @description Remove all the users from the selected array, also emits the list
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  public unselectAll() {
    this.selected = [];
    setTimeout(() => {  // The timeout is necessary because the checkbox isnt instant
      for (const nodeFather of this.allNodes) {
        for (const user of nodeFather.node.users) {
          user.checked = false;
          if (user.checked) {
            this.selected.push(user.username);
          }
        }
      }
      this.emitList();
    }, 100);
  }

  /**
  * @summary Emits the selected users list
  * @description Emits the selected users list to the father component
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  private emitList() {
    this.contactEmitter.emit(this.selected);
  }
  /**
  * @summary Get all nodes and users
  * @description Get all nodes and users
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  */
  private getAllNodes() {
    this.userService.getAllNodes().subscribe(
      (nodes) => {
        this.allNodes = nodes.sort((a, b) => b.totalFiles - a.totalFiles);
        for (const nodeFather of this.allNodes) {
          for (const node of nodeFather.node.users) {
            // Add a new property to every user to make easy the selection handler
            (node as any).checked = false;
          }
        }
      }, (error) => {
        console.log(error);
      }
    );
  }
}
