import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from '../authentification/shared/services/auth.guard';
import { AllCommandesComponent } from './pages/all-commandes/all-commandes.component';
import { DetailsCommandeComponent } from './pages/details-commande/details-commande.component';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component : DetailsCommandeComponent,
    outlet : 'sidebar'
  },
  {
    path: 'all-commandes',
    component: AllCommandesComponent,
    canActivate: [AuthGuard],
    data : {role:"ROLE_GESTIONNAIRE"}
  },
  {
    path: '',
    component: MesCommandesComponent,
    canActivate: [AuthGuard],
    data : {role:"ROLE_CLIENT"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
