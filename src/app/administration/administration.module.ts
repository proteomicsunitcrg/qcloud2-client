import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AdministrationRouterModule} from './administration-router/administration-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';

import { CategorySelectorComponent } from './cv/category-selector/category-selector.component';
import { CvFormComponent } from './cv/cv-form/cv-form.component';
import { CvListComponent } from './cv/cv-list/cv-list.component';
import { MainCvComponent } from './cv/main-cv/main-cv.component';
import { CvService } from '../services/cv.service';
import { CvFilterPipe} from '../common/cv-filter.pipe';
import { ModalModuleModule } from '../modal-module/modal-module.module';
import { ModalService } from '../modal-module/modal.service';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRouterModule,
    RouterModule,
    FormsModule,
    ModalModuleModule
  ],
  providers: [ModalService,CategoryService,CvService],
  declarations: [MainComponent, 
    SidebarComponent, 
    CategoryComponent, 
    CategorySelectorComponent, 
    CvFormComponent, 
    CvListComponent, 
    MainCvComponent,
    CvFilterPipe]
})
export class AdministrationModule { }
