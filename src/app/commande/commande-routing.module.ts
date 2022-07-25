import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesCommandesComponent } from './pages/mes-commandes/mes-commandes.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'commandes',
    pathMatch: 'full' 
  },
  {
    path: 'commandes',
    component: MesCommandesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
