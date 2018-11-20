import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { FormsModule } from '@angular/forms';
import { TraceColorPickerComponent } from './trace-color-picker/trace-color-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CategorySelectorComponent, TraceColorPickerComponent],
  exports: [CategorySelectorComponent, TraceColorPickerComponent]
})
export class SharedModulesModule { }
