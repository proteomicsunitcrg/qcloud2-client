import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { IntranetRouterModule } from './intranet-router/intranet-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainFilesComponent } from './files/main-files/main-files.component';
import { FilesListComponent } from './files/files-list/files-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterIntranetFile } from '../shared/filter-intranet-file.pipe';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [MainComponent, SidebarComponent, FilesListComponent, MainFilesComponent, FilesListComponent, FilterIntranetFile],
  imports: [
    CommonModule,
    RouterModule,
    IntranetRouterModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class IntranetModule { }
