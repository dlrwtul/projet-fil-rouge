import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanierRoutingModule } from './panier-routing.module';
import { PanierComponent } from './panier.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LigneProduitComponent } from './components/ligne-produit/ligne-produit.component';
import { ProduitModule } from 'src/app/produit/produit.module';

@NgModule({
  declarations: [
    PanierComponent,
    LigneProduitComponent
  ],
  imports: [
    CommonModule,
    PanierRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbCollapseModule,
    ProduitModule
  ]
})
export class PanierModule { }
