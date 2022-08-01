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
import { WaitCardComponent } from './components/wait-card/wait-card.component';
import { CardBoissonMenuComponent } from './components/card-boisson-menu/card-boisson-menu.component';


@NgModule({
  declarations: [
    ProduitComponent,
    CatalogueComponent,
    DetailsComponent,
    CardComponent,
    MiniCardComponent,
    PlusMoinsComponent,
    MenuBoissonComponent,
    WaitCardComponent,
    CardBoissonMenuComponent
  ],
  imports: [
    CommonModule,
    ProduitRoutingModule,
    SharedModule,
  ],
  exports : [
    PlusMoinsComponent
  ]
})
export class ProduitModule { }
