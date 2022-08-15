import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent
  },
  { 
    path: 'produit', 
    loadChildren: () => import('../produit/produit.module').then(m => m.ProduitModule) 
  },
  { 
    path: 'commande', 
    loadChildren: () => import('../commande/commande.module').then(m => m.CommandeModule) 
  },
  {
    path : "",
    redirectTo : "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
