import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { BottomModalComponent } from './bottom-modal/bottom-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent, BottomModalComponent],
  exports: [ModalComponent, BottomModalComponent],
  providers: []
})
export class ModalModuleModule { }
