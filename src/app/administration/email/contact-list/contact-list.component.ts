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
  onSelect(i: number): void {
    const contact = document.getElementsByClassName('contactList')[i];
    if (!this.selected.includes(contact.textContent) && !this.isTitle(contact.textContent)) {
      contact.classList.add('selected');
      this.selected.push(contact.textContent);
    } else {
      this.selected = this.selected.filter(item => item !== contact.textContent);
      contact.classList.remove('selected');
    }
    this.emitList();
  }
  /**
  * @summary Add all the users to the selected array
  * @description Add all the users to the selected array and sets all the users to selected css class, also emits the list
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  selectAll() {
    const contactList: any = document.getElementsByClassName('contactList');
    for (let contact of contactList) {
      if (!this.isTitle(contact.textContent) && !this.selected.includes(contact.textContent)) {
        contact.classList.add('selected');
        this.selected.push(contact.textContent);
      }
    }
    this.emitList();    
  }
  
  /**
  * @summary Remove all the users from the selected array
  * @description Remove all the users from the selected array and removes all the users the selected css class, also emits the list
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  unselectAll() {
    const contactList: any = document.getElementsByClassName('contactList');
    this.selected.splice(0, this.selected.length);
    for(let contact of contactList) {
      contact.classList.remove('selected');
    }
    this.emitList();
  }
  /**
  * @summary Check if the string is a title
  * @description Check if the string is a title based on the arroba char
  * @param name the name to check
  * @typeparam name string
  * @author Marc Serret
  * @returns true if int't a title or false otherwise
  * @since 1.0.0
  * @access public
  */
  isTitle(name: string): boolean {
    if (name.includes('@')) {
      return false;
    } else {
      return true;
    }
  }
  /**
  * @summary Emits the selected users list
  * @description Emits the selected users list to the father component
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  emitList() {
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
        for (const node of Object.keys(nodes)) {
          this.allNodes.push(nodes[node].name);
          const users = nodes[node].users;
          for (const user of Object.keys(users)) {
            if (typeof(users[user].authorities[1]) !== 'undefined') {
              this.allNodes.push(users[user].email);
            }
          }
        }
        console.log(this.allNodes);
      }, (error) => {
        console.log(error);
      }
    );
  }
}
