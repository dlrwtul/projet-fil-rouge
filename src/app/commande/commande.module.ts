import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { CommandeComponent } from './commande.component';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CommandeComponent,
    MesCommandesComponent,
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
    SharedModule,
  ]
})
export class CommandeModule { }
