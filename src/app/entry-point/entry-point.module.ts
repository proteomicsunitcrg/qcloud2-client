//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent} from './register/register.component';
import { EntryPointRouterModule} from './entry-point-router/entry-point-router.module';
import { RegistrationService } from '../services/registration.service';
import { ModalModuleModule } from '../modal-module/modal-module.module';
import { ModalComponent } from '../modal-module/modal/modal.component';
import { ModalService } from '../common/modal.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModuleModule,
    EntryPointRouterModule,
    FormsModule
  ],
  declarations: [LoginFormComponent,
  RegisterComponent],
  providers: [
    RegistrationService,
    ModalService
    
  ],
  bootstrap:[]
})
export class EntryPointModule { }
