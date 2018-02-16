import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagementRouterModule } from './management-router/management-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../common/modal.service';
import { ModalModuleModule } from '../modal-module/modal-module.module';
@NgModule({
  imports: [
    CommonModule,
    ManagementRouterModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [MainComponent, SidebarComponent, UsersComponent]
})
export class ManagementModule { }
