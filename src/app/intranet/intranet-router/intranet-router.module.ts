import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService as RoleGuard } from '../../role-guard.service';
import { MainComponent } from '../main/main.component';
import { MainFilesComponent } from '../files/main-files/main-files.component';
import { NodeMainComponent } from '../node/node-main/node-main.component';
import { SingleNodeMainComponent } from '../node/single-node/single-node-main/single-node-main.component';
import { MapsMainComponent } from '../node/maps/maps-main/maps-main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }, children: [
      { path: 'files', component: MainFilesComponent },
      { path: 'nodes', component: NodeMainComponent },
      { path: 'node/:apiKey', component: SingleNodeMainComponent },
      { path: 'nodes/map', component: MapsMainComponent },
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
