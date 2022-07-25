import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    HttpClientModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
  ],
  exports: [
    LayoutModule,
    RouterModule,
    HttpClientModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatDatepickerModule
  ]
})
export class SharedModule { }
