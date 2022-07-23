import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './produit.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { DetailsComponent } from './pages/details/details.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProduitComponent,
    CatalogueComponent,
    DetailsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    SharedModule,
  ]
})
export class ProduitModule { }
