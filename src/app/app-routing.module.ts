import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: 'securite',
    loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule) 
  }, 
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
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
    path: '**' , component : NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
