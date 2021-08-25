import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MainComponent } from './main/main.component';
import { MainNonConformitiesComponent } from './non-conformities/main-non-conformities/main-non-conformities.component';
import { RouterModule } from '@angular/router';
import { StatisticsRouterModule } from './statistics-router/statistics-router.module';
import { NonConformitiesSelectorComponent } from './non-conformities/non-conformities-selector/non-conformities-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NonConformitiesListComponent } from './non-conformities/non-conformities-list/non-conformities-list.component';
import { ThresholdNonConformityService } from '../services/threshold-non-conformity.service';
// tslint:disable-next-line:max-line-length
import { NonConformitiesInformationComponent } from './non-conformities/non-conformities-information/non-conformities-information.component';
import { PlotsModule } from '../plots/plots.module';
import { AnnotationsMainComponent } from './annotations/annotations-main/annotations-main.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ParettoComponent } from './paretto/paretto.component';
import { AnnotationsBuilderComponent } from './annotations/annotations-builder/annotations-builder.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  imports: [
    CommonModule,
    StatisticsRouterModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PlotsModule,
    NgxPaginationModule,
    TooltipModule,
    SharedModule
  ],
  declarations: [MainComponent,
    SideMenuComponent,
    MainNonConformitiesComponent,
    NonConformitiesSelectorComponent,
    NonConformitiesListComponent,
    NonConformitiesInformationComponent,
    AnnotationsMainComponent,
    ParettoComponent,
    AnnotationsBuilderComponent],
  providers: [ThresholdNonConformityService]
})
export class StatisticsModule { }
