import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogueComponent 
  },
  { 
    path: 'details/:id', 
    outlet: 'sidebar',
    component: DetailsComponent ,
    data: {
      animation: "slide"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
