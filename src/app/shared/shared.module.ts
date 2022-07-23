import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
    LayoutModule,
    RouterModule,
    HttpClientModule,
    NgbTooltipModule
  ],
  exports: [
    LayoutModule,
    RouterModule,
    HttpClientModule,
    NgbTooltipModule,
  ]
})
export class SharedModule { }
