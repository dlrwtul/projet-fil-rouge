import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivraisonRoutingModule } from './livraison-routing.module';
import { LivraisonComponent } from './livraison.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { CardCommandeComponent } from './components/card-commande/card-commande.component';
import { LivreurComponent } from './components/livreur/livreur.component';
import { CardLivreurComponent } from './components/card-livreur/card-livreur.component';
import { EtatPipe } from './shared/pipes/etat.pipe';
import { ZonePipe } from './shared/pipes/zone.pipe';
import { DispoFilterPipe } from './shared/pipes/dispo-filter.pipe';


@NgModule({
  declarations: [
    LivraisonComponent,
    CardCommandeComponent,
    LivreurComponent,
    CardLivreurComponent,
    EtatPipe,
    ZonePipe,
    DispoFilterPipe
  ],
  imports: [
    CommonModule,
    LivraisonRoutingModule,
    NgbAccordionModule,
    SharedModule,
  ]
})
export class LivraisonModule { }
