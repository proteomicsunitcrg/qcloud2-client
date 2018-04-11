import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CategorySelectorComponent],
  exports: [CategorySelectorComponent]
})
export class SharedModulesModule { }
