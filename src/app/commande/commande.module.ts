import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { CommandeComponent } from './commande.component';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsCommandeComponent } from './pages/details-commande/details-commande.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AllCommandesComponent } from './pages/all-commandes/all-commandes.component';
import { FitlterDatePipe } from './shared/pipes/fitlter-date.pipe';
import { FitlterNumPipe } from './shared/pipes/fitlter-num.pipe';
import { DetailsComponent } from './components/details/details.component'; 

@NgModule({
  declarations: [
    CommandeComponent,
    MesCommandesComponent,
    DetailsCommandeComponent,
    AllCommandesComponent,
    FitlterDatePipe,
    FitlterNumPipe,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    NgbPaginationModule,
    MatPaginatorModule,
    SharedModule,
  ]
})
export class CommandeModule { }
