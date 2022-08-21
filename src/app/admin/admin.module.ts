import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardProduitComponent } from './components/card-produit/card-produit.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    CardProduitComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ], 
  exports : [
  ]
})
export class AdminModule { }
