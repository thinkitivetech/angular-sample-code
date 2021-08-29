import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayErrorComponent } from './components/display-error/display-error.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from './modules/angular-material.module';
import { PipeModule } from './pipe/pipe.module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [HeaderComponent, DisplayErrorComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    RouterModule,
    AngularMaterialModule,
  ],
  exports: [HeaderComponent, DisplayErrorComponent, LoaderComponent],
})
export class SharedModule {}
