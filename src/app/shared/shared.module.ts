import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvFilterPipe } from './cv-filter.pipe';
import { ChartFilterPipe } from './chart-filter.pipe';
import { AnnotationSelectorDropdownComponent } from '../application/data-visualization/annotations/annotation-selector-dropdown/annotation-selector-dropdown.component';
import { AnnotationSelectorSubMenuComponent } from '../application/data-visualization/annotations/annotation-selector-sub-menu/annotation-selector-sub-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [CvFilterPipe,
    ChartFilterPipe,
    AnnotationSelectorDropdownComponent,
    AnnotationSelectorSubMenuComponent
  ],
  exports: [CvFilterPipe,
    ChartFilterPipe,
    AnnotationSelectorDropdownComponent,
    AnnotationSelectorSubMenuComponent
  ]
})
export class SharedModule { }
