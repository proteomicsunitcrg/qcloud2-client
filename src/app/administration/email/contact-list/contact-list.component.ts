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

  onSelect(i: number): void {
    const contact = document.getElementsByClassName('contactList')[i];
    if (!this.selected.includes(contact.textContent) && !this.isTitle(contact.textContent)) {
      contact.classList.add('selected');
      this.selected.push(contact.textContent);
      // console.log("pushed")
    } else {
      this.selected = this.selected.filter(item => item !== contact.textContent);
      contact.classList.remove('selected');
      // console.log("deleted")
    }
    this.emitList();
  }

  isTitle(name: string): boolean {
    if (name.includes('@')) {
      return false;
    } else {
      return true;
    }
  }

  emitList() {
    this.contactEmitter.emit(this.selected);
  }

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
