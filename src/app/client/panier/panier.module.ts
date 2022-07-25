import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanierRoutingModule } from './panier-routing.module';
import { PanierComponent } from './panier.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PanierComponent
  ],
  imports: [
  CommonModule,
    PanierRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbCollapseModule
  ]
})
export class PanierModule { }
