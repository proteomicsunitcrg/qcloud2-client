import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { UserService} from './services/user.service';
import { EntryPointModule } from './entry-point/entry-point.module';
/**
 * Required for the modals functionality
 * across all the application
 */
import { ModalModuleModule } from './modal-module/modal-module.module';
import { ModalService } from './common/modal.service';

/**
 * This are for the authentication with
 * JWT.
 */
import { AuthService } from './auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth-interceptor';
import { AuthGuardService } from './auth-guard.service';
import { RoleGuardService } from './role-guard.service';
import { tokenConfiguration} from './common/token-config';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { SystemService } from './services/system.service';
import { ThresholdService } from './services/threshold.service';

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
  ModalService,
  SystemService,
  ThresholdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
