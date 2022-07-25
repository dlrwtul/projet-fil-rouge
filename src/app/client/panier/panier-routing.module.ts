import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier.component';
import { DetailsComponent } from '../../produit/pages/details/details.component';

const routes: Routes = [
  { 
    path: '', 
    component: PanierComponent,
  },
  {
    path:'produit/details/:id',
    outlet: "sidebar",
    component: DetailsComponent,
    data: {
      animation: "slide"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PanierRoutingModule { }
