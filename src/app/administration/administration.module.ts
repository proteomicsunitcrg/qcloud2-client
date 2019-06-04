import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AdministrationRouterModule } from './administration-router/administration-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
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
import { MainSampleTypeComponent } from './sample-type/main-sample-type/main-sample-type.component';
import { SampleTypeFormComponent } from './sample-type/sample-type-form/sample-type-form.component';
import { SampleTypeListComponent } from './sample-type/sample-type-list/sample-type-list.component';
import { SamplePeptidesListComponent } from './sample-type/sample-peptides-list/sample-peptides-list.component';
import { AllPeptidesListComponent } from './sample-type/all-peptides-list/all-peptides-list.component';
import { MainChartComponent } from './charts/main-chart/main-chart.component';
import { ChartFormComponent } from './charts/chart-form/chart-form.component';
import { ChartListComponent } from './charts/chart-list/chart-list.component';
import { ChartCvsComponent } from './charts/chart-cvs/chart-cvs.component';
import { ChartSampleTypeComponent } from './charts/chart-sample-type/chart-sample-type.component';
import { ChartParamComponent } from './charts/chart-param/chart-param.component';
import { ChartContextSourceComponent } from './charts/chart-context-source/chart-context-source.component';
import { ChartParamsService } from '../services/chart-params.service';
import { ChartService } from '../services/chart.service';
import { ViewBuilderModule } from '../view-builder/view-builder.module';
import { MainDefaultViewComponent } from './default-view/main-default-view/main-default-view.component';
import { DefaultViewGeneratorComponent } from './default-view/default-view-generator/default-view-generator.component';
import { ViewListComponent } from './default-view/view-list/view-list.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { SampleTypeCategoryComponent } from './sample-type-category/sample-type-category.component';
import { SampleTypeCategoryService } from '../services/sample-type-category.service';
import { MainThresholdComponent } from './threshold/main-threshold/main-threshold.component';
import { ThresholdListComponent } from './threshold/threshold-list/threshold-list.component';
import { CvSelectorComponent } from './threshold/cv-selector/cv-selector.component';
import { ThresholdService } from '../services/threshold.service';
import { ThresholdBuilderComponent } from './threshold/threshold-builder/threshold-builder.component';
import { MainGuideSetComponent } from './guideSet/main-guide-set/main-guide-set.component';
import { MainColorManagementComponent } from './colorManagement/main-color-management/main-color-management.component';
import { ColorListComponent } from './colorManagement/color-list/color-list.component';
import { TraceColorService } from '../services/trace-color.service';
import { MainNonConformitiesComponent } from './nonconformities/main-non-conformities/main-non-conformities.component';
import { ProblemComponent } from './nonconformities/problem/problem.component';
import { TroubleshootingFormComponent } from './nonconformities/troubleshooting-form/troubleshooting-form.component';
import { TroubleshootingListComponent } from './nonconformities/troubleshooting-list/troubleshooting-list.component';
import { SampleTypeSelectorComponent } from './cv/sample-type-selector/sample-type-selector.component';
import { MessageComponent } from './message/message.component';
import { ContactListComponent } from './email/contact-list/contact-list.component';
import { EmailComponent } from './email/email.component';
import { TemplateListComponent } from './email/template-list/template-list.component';
@NgModule({
  imports: [
    CommonModule,
    AdministrationRouterModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ViewBuilderModule,
    SharedModulesModule
  ],
  providers: [CategoryService,
    CvService,
    ContextSourceService,
    SampleTypeService,
    SampleCompositionService,
    InstrumentSampleService,
    PeptideService,
    ParametersService,
    ChartParamsService,
    ChartService,
    SampleTypeCategoryService,
    ThresholdService,
    TraceColorService],
  declarations: [MainComponent,
    SidebarComponent,
    CategoryComponent,
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
    ParametersFormComponent,
    MainSampleTypeComponent,
    SampleTypeFormComponent,
    SampleTypeListComponent,
    SamplePeptidesListComponent,
    AllPeptidesListComponent,
    MainChartComponent,
    ChartFormComponent,
    ChartListComponent,
    ChartCvsComponent,
    ChartSampleTypeComponent,
    ChartParamComponent,
    ChartContextSourceComponent,
    MainDefaultViewComponent,
    DefaultViewGeneratorComponent,
    ViewListComponent,
    SampleTypeCategoryComponent,
    MainThresholdComponent,
    ThresholdListComponent,
    CvSelectorComponent,
    ThresholdBuilderComponent,
    MainGuideSetComponent,
    MainColorManagementComponent,
    ColorListComponent,
    MainNonConformitiesComponent,
    ProblemComponent,
    TroubleshootingFormComponent,
    TroubleshootingListComponent,
    SampleTypeSelectorComponent,
    MessageComponent,
    ContactListComponent,
    EmailComponent,
    TemplateListComponent]
})
export class AdministrationModule { }
