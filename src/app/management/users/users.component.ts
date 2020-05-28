import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { ModalService } from '../../common/modal.service';
import { Modal } from '../../models/modal';
import { ModalResponse } from '../../models/modalResponse';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
declare var M: any;
/**
 * User management component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private modalSubscription$: Subscription;
  /**
   * This is for restore pristine after the form submit
   */
  @ViewChild('firstnameBox', null) firstnameBox;
  @ViewChild('lastnameBox', null) lastnameBox;
  @ViewChild('emailBox', null) emailBox;

  constructor(private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService) { }

  userList = [];

  private loggedUser;

  user: User = new User('', '', '', '', '', '', null, null, null);

  ngOnInit() {
    const inputs = Array.from(document.querySelectorAll('select'));
    inputs.forEach(function (select) {
      M.Select.init(select);
    });
    this.loadUsers();
    this.modalSubscription$ = this.modalService.selectedAction$.subscribe((action) => {
      this.formAction(action);
    });
    this.loggedUser = this.authService.getUsername();
  }

  private loadUsers() {
    this.userService.getUsersByNode().subscribe(
      (result) => {
        this.parseUsersFromDb(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeRole(user: User) {
    this.userService.changeMemberRole(user).subscribe(
      (result) => {
        this.loadUsers();
      },
      (error) => {
        this.showModalByError(error);
      }
    );
  }

  deleteMember(user: User) {
    this.modalService.openModal(new Modal('Delete user',
      'Are you sure?', 'Yes', 'No', 'deleteMember', user));
  }

  private deleteMemberFromDatabase(user: User) {
    this.userService.deleteMemberFromNode(user).subscribe(
      (result) => {
        this.parseUsersFromDb(result);
      },
      (error) => {
        this.showModalByError(error);
      }
    );
  }

  onSubmit(): void {
    this.user.username = this.user.email;
    this.firstnameBox.nativeElement.classList.remove('valid');
    this.lastnameBox.nativeElement.classList.remove('valid');
    this.emailBox.nativeElement.classList.remove('valid');
    this.userService.addLabMemberToNode(this.user).subscribe(
      (result) => {
        this.parseUsersFromDb(result);
        this.showModalChangePassword();
      },
      (error) => {
        this.showModalByError(error);

      }
    );
  }
  private parseUsersFromDb(userArray: User[]) {
    this.userList = [];
    userArray.forEach((user) => {
      let role = 'User';
      if (user.authorities.length === 3) {
        role = 'Administrator';
      } else if (user.authorities.length === 2) {
        role = 'Manager';
      } else {
        role = 'User';
      }
      user.role = role;
      this.userList.push(user);
    }
    );
  }

  private showModalByError(error: HttpErrorResponse) {
    const errorCode = error.error.status;
    switch (errorCode) {
      case 409:
        this.modalService.openModal(new Modal(error.error.error,
          error.error.message, 'Ok', '', 'addnewmember', null));
        break;
      default:
        this.modalService.openModal(new Modal('Server error',
          'There is a problem with the server. Try again later.', 'Ok', '', 'addnewmember', null));
        break;
    }

  }

  private showModalChangePassword() {
    this.modalService.openModal(new Modal('New user added', `An email was sent to the user with a naive password:
    user's mail plus current year. For instance: for this email john.smith@foo.eu, the password will be john.smith2019`,
      'Ok', '', null, null));
  }

  private formAction(action: ModalResponse): void {
    switch (action.modalAction) {
      case 'addnewmember':

        break;
      case 'deleteMember':
        if (action.userAction === 'accept') {
          this.deleteMemberFromDatabase(action.objectInstance);
        } else {

        }
        break;
      default:
        console.log('unknown action');
        break;
    }

  }
  ngOnDestroy() {
    this.modalSubscription$.unsubscribe();
  }


}
