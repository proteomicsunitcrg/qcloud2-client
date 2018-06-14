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
import { DataVisualizationSideMenuComponent } from './data-visualization/data-visualization-side-menu/data-visualization-side-menu.component';
import { DataVisualizationDisplayComponent } from './data-visualization/data-visualization-display/data-visualization-display.component';
import { ViewService } from '../services/view.service';
import { DataSourceService } from '../services/data-source.service';
import { PlotsModule } from '../plots/plots.module';
import { FileService } from '../services/file.service';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { SystemService } from '../services/system.service';
import { FileInformationComponent } from './data-visualization/file-information/file-information.component';
import { IsotopologueInformationComponent } from './data-visualization/isotopologue-information/isotopologue-information.component';
import { SampleTypeService } from '../services/sample-type.service';

@NgModule({
  imports: [
    CommonModule,
    PlotsModule,
    ApplicationRouterModule,
    FormsModule],
  declarations: [MainWindowComponent,
    TopMenuComponent,
    InstrumentStatusComponent,
    DataVisualizationMainWindowComponent,
    DataVisualizationSideMenuComponent,
    DataVisualizationDisplayComponent,
    WelcomeComponent,
    FileInformationComponent,
    IsotopologueInformationComponent
    ],
  providers: [DataService,
    ViewService,
    DataSourceService,
    FileService,
    SystemService,
    SampleTypeService]
})
export class ApplicationModule { }
