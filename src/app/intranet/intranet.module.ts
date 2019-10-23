import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { IntranetRouterModule } from './intranet-router/intranet-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainFilesComponent } from './files/main-files/main-files.component';
import { FilesListComponent } from './files/files-list/files-list.component';


@NgModule({
  declarations: [MainComponent, SidebarComponent, FilesListComponent, MainFilesComponent, FilesListComponent],
  imports: [
    CommonModule,
    RouterModule,
    IntranetRouterModule
  ]
})
export class IntranetModule { }
