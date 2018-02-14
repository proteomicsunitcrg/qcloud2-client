import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AdministrationRouterModule} from './administration-router/administration-router.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
@NgModule({
  imports: [
    CommonModule,
    AdministrationRouterModule,
    RouterModule,
    FormsModule
  ],
  providers: [CategoryService],
  declarations: [MainComponent, SidebarComponent, CategoryComponent]
})
export class AdministrationModule { }
