import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivreurComponent } from './components/livreur/livreur.component';
import { LivraisonComponent } from './livraison.component';

const routes: Routes = [
  { 
    path: '', 
    component: LivraisonComponent,
  },
  { 
    path: 'livreur', 
    component: LivreurComponent,
    outlet : 'sidebar',
    data : {
      animation : 'slider'
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivraisonRoutingModule { }
