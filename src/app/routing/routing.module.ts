import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'application', loadChildren: () => import('../application/application.module').then(m => m.ApplicationModule) },
  { path: 'login', loadChildren: () => import('../entry-point/entry-point.module').then(m => m.EntryPointModule) },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
