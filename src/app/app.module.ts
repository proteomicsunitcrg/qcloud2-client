import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { UserService } from './services/user.service';
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
import { tokenConfiguration } from './common/token-config';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { SystemService } from './services/system.service';
import { ThresholdService } from './services/threshold.service';
import { ViewService } from './services/view.service';
import { WebsocketService } from './services/websocket.service';
import { TroubleshootingService } from './services/troubleshooting.service';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ShContextMenuModule } from 'ng2-right-click-menu';
import { LogoService } from './services/logo.service'
import { LinkService } from './services/links.service'

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ShContextMenuModule,
    HttpClientModule,
    EntryPointModule,
    RoutingModule,
    ModalModuleModule,
    DragulaModule,
    NgProgressModule,
    NgProgressHttpModule,
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
    ThresholdService,
    ViewService,
    WebsocketService,
    TroubleshootingService,
    LogoService,
    LinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
