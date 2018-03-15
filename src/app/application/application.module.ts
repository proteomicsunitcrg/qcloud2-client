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
// import { HolderComponent } from './layout/holder/holder.component';
import { InstrumentStatusComponent } from './layout/instrument-status/instrument-status.component';
import { DataService } from '../services/data.service';
import { DataVisualizationMainWindowComponent } from './data-visualization/data-visualization-main-window/data-visualization-main-window.component';
import { DataVisualizationSideMenuComponent } from './data-visualization/data-visualization-side-menu/data-visualization-side-menu.component';
import { DataVisualizationDisplayComponent } from './data-visualization/data-visualization-display/data-visualization-display.component';
import { ViewService } from '../services/view.service';
import { DataSourceService } from '../services/data-source.service';
import { PlotsModule } from '../plots/plots.module';
import { FileService } from '../services/file.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PlotsModule,
    ApplicationRouterModule,
    FormsModule],
  declarations: [MainWindowComponent, 
    TopMenuComponent, 
    // HolderComponent, 
    InstrumentStatusComponent, 
    DataVisualizationMainWindowComponent, 
    DataVisualizationSideMenuComponent,
    DataVisualizationDisplayComponent
    ],
  providers:[DataService,
    ViewService,
    DataSourceService,
    FileService]
  
})
export class ApplicationModule { }
