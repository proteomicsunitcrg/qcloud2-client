import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterIntranetFile } from '../shared/filter-intranet-file.pipe';
import { FilesListComponent } from './files/files-list/files-list.component';
import { MainFilesComponent } from './files/main-files/main-files.component';
import { IntranetRouterModule } from './intranet-router/intranet-router.module';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NodeMainComponent } from './node/node-main/node-main.component';
import { NodeListComponent } from './node/node-list/node-list.component';
import { SingleNodeMainComponent } from './node/single-node/single-node-main/single-node-main.component';
import { SingleNodeViewComponent } from './node/single-node/single-node-view/single-node-view.component';
import { GeneralStatsComponent } from './node/general-stats/general-stats.component';
import { SingleNodeLsComponent } from './node/single-node/single-node-ls/single-node-ls.component';
import { SingleNodeUsersComponent } from './node/single-node/single-node-users/single-node-users.component';
import { PreviousRouteService } from '../services/PreviousRoute.service';
import { MapsMainComponent } from './node/maps/maps-main/maps-main.component';
import { MapsMapComponent } from './node/maps/maps-map/maps-map.component';


@NgModule({
  declarations: [MainComponent, SidebarComponent, FilesListComponent,
    MainFilesComponent, FilesListComponent, FilterIntranetFile, NodeMainComponent,
    NodeListComponent, SingleNodeMainComponent, SingleNodeViewComponent, GeneralStatsComponent,
    SingleNodeLsComponent, SingleNodeUsersComponent, MapsMainComponent, MapsMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IntranetRouterModule,
    NgxPaginationModule,
    FormsModule,
    TooltipModule,
    NgxSmartModalModule.forChild(),
  ],
  providers: [
    PreviousRouteService
  ]
})
export class IntranetModule { }
