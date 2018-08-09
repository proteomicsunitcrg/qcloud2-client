import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MainComponent } from './main/main.component';
import { MainNonConformitiesComponent } from './non-conformities/main-non-conformities/main-non-conformities.component';
import { RouterModule } from '@angular/router';
import { StatisticsRouterModule } from './statistics-router/statistics-router.module';
import { NonConformitiesSelectorComponent } from './non-conformities/non-conformities-selector/non-conformities-selector.component';
import { FormsModule } from '@angular/forms';
import { NonConformitiesListComponent } from './non-conformities/non-conformities-list/non-conformities-list.component';
import { ThresholdNonConformityService } from '../services/threshold-non-conformity.service';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRouterModule,
    RouterModule,
    FormsModule
  ],
  declarations: [MainComponent,
    SideMenuComponent,
    MainNonConformitiesComponent,
    NonConformitiesSelectorComponent,
    NonConformitiesListComponent],
  providers: [ThresholdNonConformityService]
})
export class StatisticsModule { }
