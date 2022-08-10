import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable, tap } from 'rxjs';
import { Commande } from 'src/app/shared/models/commande';
import { EventService } from 'src/app/shared/services/event-service.service';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { CommandeStoreService } from '../../shared/services/commande-store.service';

@Component({
  selector: 'ild-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.css']
})
export class MesCommandesComponent implements OnInit {

  isPanier = true
  enCours = "en cours"
  valide = "valide"
  annule = "annule"
  filterVal :string = "en cours"
  dates : string[] = []
  page = 1;
  commandes$ : Observable<Commande[]> = new Observable
  commandesClone$ :any
  constructor(private commandeServ : CommandeStoreService,private eventServ : EventService,private router : Router,private toast : NgToastService,private panierServ : PanierService) { 
    
  }

  ngOnInit(): void {
    this.commandes$ = this.commandeServ.$commandesClient(this.enCours)
  }

  onValChange(value :string){
    this.filterVal = value
    this.commandes$ = this.commandeServ.$commandesClient(this.filterVal)
  }

  detailsCommande(commande : Commande){
    
    this.router.navigate(['client','panier'])
  }

  annulerCommande(commande : Commande){
    this.commandes$ = this.commandes$.pipe(
      map(data => {
        data.forEach(commande => {
          if (commande.id == delCommande.id) {
            data.splice(data.indexOf(commande),1)
          }
        })
        return data
      })
    )
    let delCommande : Commande = {}
    if (commande.id != undefined) {  
      this.commandeServ.$annulerCommande(commande.id).subscribe(data => delCommande = data)
      this.toast.success({detail:"SUCCESS",summary:'Commmande Annulée avec succes',position:'tl',duration:5000});

    }
    
  }

  dateFilter(value:string){
    this.commandes$ = this.commandeServ.$commandesClient(this.filterVal)
    const date = new Date(value)
    this.commandes$ = this.commandes$.pipe(
      map(data => {
        let newData : Commande[] = []
        data.forEach((commande) => {
          if (commande.createdAt != undefined) {
            let createdAt = new Date(commande.createdAt)
            if (createdAt.toLocaleDateString() == date.toLocaleDateString()) {
              newData.push(commande)
            }
          }
          
        })
        return newData
      })
    )
  }

  recommanderCommande(_commande : Commande): void {

  }

}
