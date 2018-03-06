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
import { MainContextSourceComponent } from './context-source/main-context-source/main-context-source.component';
import { InstrumentSampleFormComponent } from './context-source/instrument-sample-form/instrument-sample-form.component';
import { InstrumentSampleListComponent } from './context-source/instrument-sample-list/instrument-sample-list.component';
import { ContextSourceDetailComponent } from './context-source/context-source-detail/context-source-detail.component';
import { ContextSourceService } from '../services/context-source.service';
import { SampleTypeService } from '../services/sample-type.service';
import { SampleCompositionService } from '../services/sample-composition.service';
import { InstrumentSampleService } from '../services/instrument-sample.service';
import { PeptidesListComponent } from './context-source/peptides-list/peptides-list.component';
import { PeptideService } from '../services/peptide.service';
import { PeptideDetailFormComponent } from './context-source/peptide-detail-form/peptide-detail-form.component';
import { SampleCompositionFormComponent } from './context-source/sample-composition-form/sample-composition-form.component';
import { SharedModule } from '../shared/shared.module';
import { MainParametersComponent } from './parameters/main-parameters/main-parameters.component';
import { ParametersListComponent } from './parameters/parameters-list/parameters-list.component';
import { ParametersFormComponent } from './parameters/parameters-form/parameters-form.component';
import { ParametersService } from '../services/parameters.service';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRouterModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  providers: [CategoryService,
    CvService,
    ContextSourceService,
    SampleTypeService,
    SampleCompositionService,
    InstrumentSampleService,
    PeptideService,
    ParametersService],
  declarations: [MainComponent, 
    SidebarComponent,
    CategoryComponent,
    CategorySelectorComponent,
    CvFormComponent,
    CvListComponent,
    MainCvComponent,
    MainContextSourceComponent,
    InstrumentSampleFormComponent,
    InstrumentSampleListComponent,
    ContextSourceDetailComponent,
    PeptidesListComponent,
    PeptideDetailFormComponent,
    SampleCompositionFormComponent,
    MainParametersComponent,
    ParametersListComponent,
    ParametersFormComponent]
})
export class AdministrationModule { }
