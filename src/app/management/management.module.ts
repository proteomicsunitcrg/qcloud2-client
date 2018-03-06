import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ManagementRouterModule } from './management-router/management-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { DataSourceComponent } from './data-source/data-source.component';
import { CvSelectorComponent } from './data-source/cv-selector/cv-selector.component';
import { DataSourceListComponent } from './data-source/data-source-list/data-source-list.component';
import { CvService } from '../services/cv.service';

import { DataSourceService } from '../services/data-source.service';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    ManagementRouterModule,
    RouterModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [MainComponent, 
    SidebarComponent, 
    UsersComponent, 
    DataSourceComponent, 
    CvSelectorComponent, 
    DataSourceListComponent],
  providers: [CategoryService,
    CvService,
    DataSourceService]
})
export class ManagementModule { }
