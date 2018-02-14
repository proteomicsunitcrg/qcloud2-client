import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { ApplicationModule } from './application/application.module';
import { AdministrationModule} from './administration/administration.module';
import { ManagementModule} from './management/management.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    EntryPointModule,
    ApplicationModule,
    RoutingModule,
    AdministrationModule,
    ManagementModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        },
        whitelistedDomains: ['localhost:8080']
      }
    })
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
  AuthGuardService,
  RoleGuardService,
  UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
