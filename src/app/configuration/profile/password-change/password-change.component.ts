import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../../common/password-validator';
import { UserService } from '../../../services/user.service';
import { ModalService } from '../../../common/modal.service';
import { Modal } from '../../../models/modal';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  currentPasswordFormGroup: FormGroup;
  newPasswordFormGroup: FormGroup;
  changePasswordFormGroup: FormGroup;

  isPasswordChanged = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: ModalService) {
    this.newPasswordFormGroup = this.formBuilder.group({
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: PasswordValidator.validate.bind(this)
    });
    this.currentPasswordFormGroup = this.formBuilder.group({
      currentPassword: ['', Validators.required],
    });
    this.changePasswordFormGroup = this.formBuilder.group({
      currentPasswordFormGroup: this.currentPasswordFormGroup,
      newPasswordFormGroup: this.newPasswordFormGroup
    });
   }

  currentPassword: string;

  newPassword: string;

  verifyPassword: string;

  ngOnInit() {
  }

  onSubmit(): void {
    const currentPassword = this.currentPasswordFormGroup.controls.currentPassword.value;
    const newPassword = this.newPasswordFormGroup.controls.newPassword.value;
    const repeatPassword = this.newPasswordFormGroup.controls.repeatPassword.value;
    if (newPassword === repeatPassword) {
      this.userService.changeUserPassword(currentPassword, newPassword)
        .subscribe(
          (res) => {
            // this.newPasswordFormGroup.reset({'repeatPassword' : ''});
            this.changePasswordFormGroup.reset({newPasswordFormGroup : {
              'repeatPassword' : ''}
            });
            this.isPasswordChanged = true;
          }, err => {
            this.modalService.openModal(new Modal('Error', err.error.message, 'Ok', null, 'updatePassword', null));
          }
        );
    }
  }

}
