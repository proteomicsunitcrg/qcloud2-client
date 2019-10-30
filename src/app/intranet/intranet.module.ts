import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterIntranetFile } from '../shared/filter-intranet-file.pipe';
import { FilesListComponent } from './files/files-list/files-list.component';
import { MainFilesComponent } from './files/main-files/main-files.component';
import { IntranetRouterModule } from './intranet-router/intranet-router.module';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';


@NgModule({
  declarations: [MainComponent, SidebarComponent, FilesListComponent, MainFilesComponent, FilesListComponent, FilterIntranetFile],
  imports: [
    CommonModule,
    RouterModule,
    IntranetRouterModule,
    NgxPaginationModule,
    FormsModule,
    TooltipModule,
    NgxSmartModalModule.forChild()
  ]
})
export class IntranetModule { }
