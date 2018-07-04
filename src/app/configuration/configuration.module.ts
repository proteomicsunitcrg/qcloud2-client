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
import { ViewService } from '../services/view.service';
/**
 * Module for user configuration like profile and user views
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigurationRouterModule,
    ViewBuilderModule
  ],
  declarations: [MainComponent, SidebarComponent, MainUserViewComponent, UserViewListComponent, UserViewBuilderComponent],
  providers: [
    ViewService
  ]
})
export class ConfigurationModule { }
