import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from './datepipe.pipe';
@NgModule({
  declarations: [CustomDatePipe
  ],
  imports: [CommonModule, FormsModule],
  exports: [CustomDatePipe]
})
export class PipeModule { }
