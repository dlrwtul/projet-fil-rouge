import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbTooltipModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { NavComponent } from './nav/nav.component'


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    GoogleMapsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavComponent,
    AdminHeaderComponent
  ]
})
export class LayoutModule {
  
 }
