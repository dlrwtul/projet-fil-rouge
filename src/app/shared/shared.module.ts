import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    LayoutModule,
    RouterModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
