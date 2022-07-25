import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitRoutingModule } from './produit-routing.module';
import { ProduitComponent } from './produit.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { DetailsComponent } from './pages/details/details.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { PlusMoinsComponent } from './components/plus-moins/plus-moins.component';
import { MenuBoissonComponent } from './components/menu-boisson/menu-boisson.component';


@NgModule({
  declarations: [
    ProduitComponent,
    CatalogueComponent,
    DetailsComponent,
    CardComponent,
    MiniCardComponent,
    PlusMoinsComponent,
    MenuBoissonComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    SharedModule,
  ]
})
export class ProduitModule { }
