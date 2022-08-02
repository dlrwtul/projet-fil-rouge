import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from '../authentification/shared/services/auth.guard';
import { DetailsCommandeComponent } from './pages/details-commande/details-commande.component';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';

const routes: Routes = [
  {
    path: '',
    component: MesCommandesComponent,
    canActivate: [AuthGuard]
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
