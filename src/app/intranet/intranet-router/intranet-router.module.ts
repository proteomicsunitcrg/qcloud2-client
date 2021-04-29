import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { MainFilesComponent } from '../files/main-files/main-files.component';
import { NodeMainComponent } from '../node/node-main/node-main.component';
import { SingleNodeMainComponent } from '../node/single-node/single-node-main/single-node-main.component';
import { ApiKeyNodeComponent } from '../api-key/api-key-node/api-key-node.component';
import { ApiKeyLsComponent } from '../api-key/api-key-ls/api-key-ls.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }, children: [
      { path: 'files', component: MainFilesComponent },
      { path: 'nodes', component: NodeMainComponent },
      { path: 'node/:apiKey', component: SingleNodeMainComponent },
      { path: 'api-key/node', component: ApiKeyNodeComponent },
      { path: 'api-key/ls', component: ApiKeyLsComponent }
      // { path: 'systems', component: MainSystemComponent},
      // { path: 'thresholds', component: MainThresholdComponent}
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class IntranetRouterModule { }
