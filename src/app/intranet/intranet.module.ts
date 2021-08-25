import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ApiKeyNodeComponent } from './api-key/api-key-node/api-key-node.component';
import { ApiKeyLsComponent } from './api-key/api-key-ls/api-key-ls.component';
import { ApiKeyUserComponent } from './api-key/api-key-user/api-key-user.component';


@NgModule({
  declarations: [MainComponent, SidebarComponent, FilesListComponent,
    MainFilesComponent, FilesListComponent, FilterIntranetFile, NodeMainComponent,
    NodeListComponent, SingleNodeMainComponent, SingleNodeViewComponent, GeneralStatsComponent,
    SingleNodeLsComponent, SingleNodeUsersComponent, ApiKeyNodeComponent, ApiKeyLsComponent, ApiKeyUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IntranetRouterModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    NgxSmartModalModule
  ],
  providers: [
    PreviousRouteService
  ]
})
export class IntranetModule { }
