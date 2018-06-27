import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'application', loadChildren: '../application/application.module#ApplicationModule'},
  { path: 'login', loadChildren: '../entry-point/entry-point.module#EntryPointModule'},
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
