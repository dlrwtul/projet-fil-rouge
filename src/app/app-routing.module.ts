import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentification/shared/services/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: 'securite',
    loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule) 
  }, 
  
  { 
    path: 'client', 
    loadChildren: () => import('./client/client.module').then(m => m.ClientModule) 
    
  }, 
  {
    path: "",
    redirectTo: "client",
    pathMatch: "full"
  },
  { 
    path: 'admin', 
    children : [{
      path: 'produit', 
      loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) ,
    },
    { 
      path: 'commande', 
      loadChildren: () => import('./commande/commande.module').then(m => m.CommandeModule) 
    },
    { 
      path: 'livraison', 
      loadChildren: () => import('./livraison/livraison.module').then(m => m.LivraisonModule) 
    }
  ],
    canActivate : [AuthGuard],
    data: {
      role: "ROLE_GESTIONNAIRE"
    }
  }, 
  {
    path: '**' , component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
