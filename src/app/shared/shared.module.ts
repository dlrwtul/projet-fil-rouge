import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NotifierModule } from 'angular-notifier';
import { LoaderComponent } from './loader/loader.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    LoaderComponent
  ],
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
    NotifierModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    LayoutModule,
    RouterModule,
    HttpClientModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    NotifierModule,
    LoaderComponent,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ]
})
export class SharedModule { }
