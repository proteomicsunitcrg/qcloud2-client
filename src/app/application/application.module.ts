/**
 * This is the main module of the application.
 * Here you find almost everything of the application
 * functionality.
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 * 
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from './main-window/main-window.component';
import { ApplicationRouterModule } from './application-router/application-router.module';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { HolderComponent } from './layout/holder/holder.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationRouterModule,
  ],
  declarations: [MainWindowComponent, TopMenuComponent, HolderComponent],
  
})
export class ApplicationModule { }
