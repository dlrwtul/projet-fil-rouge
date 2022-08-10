import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutListProduitComponent } from './pages/ajout-list-produit/ajout-list-produit.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { DetailsComponent } from './pages/details/details.component';
import { AuthGuard } from '../authentification/shared/services/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogueComponent 
  },
  { 
    path: 'details/:id', 
    outlet: 'sidebar',
    component: DetailsComponent ,
  },
  { 
    path: 'ajout-list-produit', 
    component: AjoutListProduitComponent ,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ProduitRoutingModule { }
