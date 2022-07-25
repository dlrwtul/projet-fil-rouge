import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsCommandeComponent } from './pages/details-commande/details-commande.component';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';

const routes: Routes = [
  {
    path: '',
    component: MesCommandesComponent
  },
  {
    path: 'details/:id',
    component : DetailsCommandeComponent,
    outlet : 'sidebar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
