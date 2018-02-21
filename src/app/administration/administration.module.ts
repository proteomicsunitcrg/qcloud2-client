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
import { MainContextSourceComponent } from './context-source/main-context-source/main-context-source.component';
import { ContextSourceSelectorComponent } from './context-source/context-source-selector/context-source-selector.component';
import { ContextSourcePeptideFormComponent } from './context-source/context-source-peptide-form/context-source-peptide-form.component';
import { ContextSourceListComponent } from './context-source/context-source-list/context-source-list.component';
import { ContextSourceDetailComponent } from './context-source/context-source-detail/context-source-detail.component';
import { PeptideService } from '../services/peptide.service';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRouterModule,
    RouterModule,
    FormsModule,
  ],
  providers: [CategoryService,CvService,PeptideService],
  declarations: [MainComponent, 
    SidebarComponent,
    CategoryComponent,
    CategorySelectorComponent,
    CvFormComponent,
    CvListComponent,
    MainCvComponent,
    CvFilterPipe,
    MainContextSourceComponent,
    ContextSourceSelectorComponent,
    ContextSourcePeptideFormComponent,
    ContextSourceListComponent,
    ContextSourceDetailComponent]
})
export class AdministrationModule { }
