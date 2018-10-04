import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { ConfigurationRouterModule } from './configuration-router/configuration-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainUserViewComponent } from './user-view/main-user-view/main-user-view.component';
import { UserViewListComponent } from './user-view/user-view-list/user-view-list.component';
import { UserViewBuilderComponent } from './user-view/user-view-builder/user-view-builder.component';
import { ViewBuilderModule } from '../view-builder/view-builder.module';
import { MainProfileComponent } from './profile/main-profile/main-profile.component';
import { ProfileManagementComponent } from './profile/profile-management/profile-management.component';
import { PasswordChangeComponent } from './profile/password-change/password-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultViewSelectorComponent } from './profile/default-view-selector/default-view-selector.component';
import { UserDefaultViewService } from '../services/user-default-view.service';
/**
 * Module for user configuration like profile and user views
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigurationRouterModule,
    ViewBuilderModule
  ],
  declarations: [MainComponent,
    SidebarComponent,
    MainUserViewComponent,
    UserViewListComponent,
    UserViewBuilderComponent,
    MainProfileComponent,
    ProfileManagementComponent,
    PasswordChangeComponent,
    DefaultViewSelectorComponent],
  providers: [
    UserDefaultViewService
  ]
})
export class ConfigurationModule { }
