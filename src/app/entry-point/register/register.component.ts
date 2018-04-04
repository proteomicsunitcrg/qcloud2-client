import { Component, OnInit } from '@angular/core';
import { Node } from '../../models/node';
import { User } from '../../models/user';
import { RegistrationService} from '../../services/registration.service';
import { Router } from '@angular/router';

import { Modal} from '../../models/modal';
import { ModalResponse} from '../../models/modalResponse';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../../common/modal.service';

/**
 * Register component
 * @author Daniel Mancera <daniel.mancera@crg.eu>
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  user: User = new User('', '', '', '', '', '');

  node: Node = new Node('', '', [this.user]);

  showPassword = false;

  private modalSubscription$: Subscription;


  constructor(private registrationService: RegistrationService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
    this.modalSubscription$ = this.modalService.selectedAction$.subscribe((action) => {
      this.formAction(action);
    });
  }
  changeRoute() {
    this.router.navigate(['login']);
  }

  onSubmit(): void {
    this.node.users[0].username = this.node.users[0].email;
    this.registrationService.getToS().subscribe((text) => {
      this.modalService.openModal(new Modal('Terms of Use', text, 'Accept', 'Reject', 'terms',null));
    });
  }

  formAction(action: ModalResponse): void {
    switch (action.modalAction) {
      case 'terms':
        if (action.userAction === 'accept') {
          // send registration
          this.registrationService.registerNode(this.node).subscribe(
            (resp) => {
              this.modalService.openModal(new Modal('Successful',
                'You have been registered. We have sent you an email with further instructions.', 'Ok', '', 'welcome',null));
            },
            (error) => {
              this.modalService.openModal(new Modal('Error',
                'Node name or email already in use.', 'Ok', '', 'error',null));
            }
          );
        } else {
          // back to login
          this.router.navigate(['login']);
        }
        break;
      case 'welcome':
        this.router.navigate(['login']);
        break;
      case 'error':
        console.log('error filling form fields');
        break;
      default:
        console.log('formaction unknown action');
        break;
    }
  }

  openModal(): void {
    this.registrationService.getToS().subscribe((text) => {
      this.modalService.openModal(new Modal('QCloud 2.0', text, 'Accept', 'Reject', 'terms',null));
    });
  }


  togglePassword(): void {
    // change the type of the input for password
    if (this.showPassword) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }
  ngOnDestroy() {
    this.modalSubscription$.unsubscribe();
  }

}
