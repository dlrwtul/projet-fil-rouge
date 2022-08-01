import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Commande } from 'src/app/shared/models/commande';
import { PanierService } from 'src/app/shared/services/panier-service.service';

@Component({
  selector: 'ild-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  public isCollapsed = true;
  page = 4;
  items : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  pageSize : number = 10;
  montantTotal : number = 0;
  commande$ : Observable<Commande> |undefined = undefined ; 
  constructor(private panierServ: PanierService) { }

  ngOnInit(): void {
    this.commande$ = this.panierServ.getCommande();
    this.montantTotal = this.panierServ.getMontant()
  }

}
