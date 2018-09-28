import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { ModalService } from '../../common/modal.service';
import { Modal } from '../../models/modal';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService,
    private modalService: ModalService) { }

  user = new User(null, null, null, null, null, null);

  isTokenPresent = false;

  showPassword = false;

  token: string;

  modalAction$: Subscription;

  ngOnInit() {
    this.subscribeToRoute();
    this.subscribeToModal();
  }

  private subscribeToModal(): void {
    this.modalAction$ = this.modalService.selectedAction$
      .subscribe(
        (action) => {
          switch (action.modalAction) {
            case 'updatePassword':
              // navigate
              this.router.navigate(['/login']);
              break;
            case 'passwordResetPetition':
              this.router.navigate(['/login']);
              break;
            default:
              break;
          }
        }
      );
  }

  ngOnDestroy() {
    this.modalAction$.unsubscribe();
  }

  onSubmit(): void {
    if (this.user.password === null) {
      if (this.user.username !== undefined) {
        this.passwordResetService.askForPasswordReset(this.user)
          .subscribe(
            () => {
              this.modalService.openModal(new Modal('Server information',
                'An email with further instructions has been sent to your email. Please check it and your spam folder',
                'Ok', null, 'passwordResetPetition', null));
            }, err => this.showModalError(err.error.message)
          );
      }
    } else {
      this.passwordResetService.saveNewPassword(this.user, this.token)
        .subscribe(
          () => {
            this.modalService.openModal(new Modal('Server information',
              'Password update correctly, you can now log in', 'Ok', null, 'updatePassword', null));

          }, err => console.log('update', err)
        );
    }
  }

  private subscribeToRoute(): void {
    this.route.queryParams.subscribe(
      (params) => {
        if (params['a'] !== undefined) {
          const token = JSON.parse(atob(params['a']));
          this.token = token['token'];
          this.user.apiKey = token['user']['apiKey'];
          // check token
          this.passwordResetService.checkPasswordResetToken(token['token'])
            .subscribe(
              () => {
                this.isTokenPresent = true;
              }, (err) => {
                this.showModalError(err.error.message);
              }
            );
        }
      }
    );
  }

  private showModalError(message: string): void {
    this.modalService.openModal(new Modal('Server information', message, 'Ok', null, 'checktoken', null));
  }


}
