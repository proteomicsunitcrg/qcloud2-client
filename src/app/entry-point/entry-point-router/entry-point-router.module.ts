import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent} from '../login-form/login-form.component';
import { RegisterComponent} from '../register/register.component';
const routes: Routes = [
  // { path: 'text', component: TextComponent,canActivate: [RoleGuard], data: {expectedRole: 'ROLE_MANAGER'}}
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterComponent},
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
