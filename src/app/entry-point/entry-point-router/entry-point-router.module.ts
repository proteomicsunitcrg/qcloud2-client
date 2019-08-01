import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterComponent } from '../register/register.component';
import { PasswordRecoveryComponent } from '../password-recovery/password-recovery.component';
const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recovery', component: PasswordRecoveryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class EntryPointRouterModule { }
