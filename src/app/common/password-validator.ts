import { FormGroup } from '@angular/forms';

export class PasswordValidator {
    static validate(registrationFormGroup: FormGroup) {
        const newPassword = registrationFormGroup.controls.newPassword.value;
        const repeatPassword = registrationFormGroup.controls.repeatPassword.value;
        if (repeatPassword.length <= 0) {
            return null;
        }

        if (repeatPassword !== newPassword) {
            return {
                doesMatchPassword: true
            };
        }
        return null;
    }
}
