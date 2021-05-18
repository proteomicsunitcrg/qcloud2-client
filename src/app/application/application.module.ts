/**
 * This is the main module of the application.
 * Here you find almost everything of the application
 * functionality.
 * @author Daniel Mancera<daniel.mancera@crg.eu>
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from './main-window/main-window.component';
import { ApplicationRouterModule } from './application-router/application-router.module';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { InstrumentStatusComponent } from './layout/instrument-status/instrument-status.component';
import { DataService } from '../services/data.service';
// tslint:disable-next-line:max-line-length
import { DataVisualizationMainWindowComponent } from './data-visualization/data-visualization-main-window/data-visualization-main-window.component';
// tslint:disable-next-line:max-line-length
import { DataVisualizationDateMenuComponent } from './data-visualization/data-visualization-date-menu/data-visualization-date-menu.component';
import { DataVisualizationDisplayComponent } from './data-visualization/data-visualization-display/data-visualization-display.component';
import { DataSourceService } from '../services/data-source.service';
import { PlotsModule } from '../plots/plots.module';
import { FileService } from '../services/file.service';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { FileInformationComponent } from './data-visualization/file-information/file-information.component';
import { IsotopologueInformationComponent } from './data-visualization/isotopologue-information/isotopologue-information.component';
import { SampleTypeService } from '../services/sample-type.service';
import { PlotService } from '../services/plot.service';
import { SampleCompositionService } from '../services/sample-composition.service';
// tslint:disable-next-line:max-line-length
import { DataVisualizationSideMenuComponent } from './data-visualization/data-visualization-side-menu/data-visualization-side-menu.component';
import { AnnotationMainComponent } from './data-visualization/annotations/annotation-main/annotation-main.component';
import { AnnotationSelectorComponent } from './data-visualization/annotations/annotation-selector/annotation-selector.component';
import { AnnotationListComponent } from './data-visualization/annotations/annotation-list/annotation-list.component';
import { AnnotationListItemComponent } from './data-visualization/annotations/annotation-list-item/annotation-list-item.component';
import { AnnotationService } from '../services/annotation.service';
import { ShContextMenuModule } from 'ng2-right-click-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// tslint:disable-next-line:max-line-length
import { AnnotationSelectorDropdownComponent } from './data-visualization/annotations/annotation-selector-dropdown/annotation-selector-dropdown.component';
// tslint:disable-next-line:max-line-length
import { AnnotationSelectorSubMenuComponent } from './data-visualization/annotations/annotation-selector-sub-menu/annotation-selector-sub-menu.component';
import { DashboardComponent } from './layout/welcome/dashboard/dashboard.component';
import { MessagesComponent } from './layout/welcome/messages/messages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  imports: [
    CommonModule,
    PlotsModule,
    ApplicationRouterModule,
    FormsModule,
    ShContextMenuModule,
    MatMenuModule,
    MatIconModule,
    NgxPaginationModule,
    NgxSmartModalModule.forChild()
  ],
  declarations: [MainWindowComponent,
    TopMenuComponent,
    InstrumentStatusComponent,
    DataVisualizationMainWindowComponent,
    DataVisualizationDateMenuComponent,
    DataVisualizationDisplayComponent,
    WelcomeComponent,
    FileInformationComponent,
    IsotopologueInformationComponent,
    DataVisualizationSideMenuComponent,
    AnnotationMainComponent,
    AnnotationSelectorComponent,
    AnnotationListComponent,
    AnnotationListItemComponent,
    AnnotationSelectorDropdownComponent,
    AnnotationSelectorSubMenuComponent,
    DashboardComponent,
    MessagesComponent,


  ],
  providers: [DataService,
    DataSourceService,
    FileService,
    SampleTypeService,
    PlotService,
    SampleCompositionService,
    AnnotationService,
  ]
})
export class ApplicationModule { }
