import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RoutingModule } from './routing/routing.module';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { UserService} from './services/user.service';

import { AuthInterceptor } from './auth-interceptor';

import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService } from './role-guard.service';
import { EntryPointModule } from './entry-point/entry-point.module';
import { ModalModuleModule } from './modal-module/modal-module.module';
import { ModalService } from './common/modal.service';

import {tokenConfiguration} from './common/token-config';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EntryPointModule,
    RoutingModule,
    ModalModuleModule,
    DragulaModule,
    JwtModule.forRoot(tokenConfiguration)
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
  DragulaService,
  AuthGuardService,
  RoleGuardService,
  UserService,
  ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
