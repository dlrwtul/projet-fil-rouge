import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { CommandeComponent } from './commande.component';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsCommandeComponent } from './pages/details-commande/details-commande.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator'; 

@NgModule({
  declarations: [
    CommandeComponent,
    MesCommandesComponent,
    DetailsCommandeComponent,
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    SharedModule,
    NgbPaginationModule,
    MatPaginatorModule
  ]
})
export class CommandeModule { }
