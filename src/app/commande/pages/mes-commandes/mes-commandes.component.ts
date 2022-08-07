import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable } from 'rxjs';
import { Commande } from 'src/app/shared/models/commande';
import { EventService } from 'src/app/shared/services/event-service.service';
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
  page = 1;
  commandes$ : Observable<Commande[]> = new Observable

  constructor(private commandeServ : CommandeStoreService,private eventServ : EventService,private router : Router,private toast : NgToastService) { 
    
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
    let delCommande : Commande = {}
    if (commande.id != undefined) {  
      this.commandeServ.$annulerCommande(commande.id).subscribe(data => delCommande = data)
      this.toast.success({detail:"SUCCESS",summary:'Commmande Annulée avec succes',position:'tl',duration:5000});

    }
    this.commandes$.pipe(
      map(data => {
        data.forEach(commande => {
          if (commande.id == delCommande.id) {
            data.splice(data.indexOf(commande),1)
          }
        })
        return data
      })
    )
  }

  getDate(value : string) {
    console.log(value)
  }

  recommanderCommande(commande : Commande) {

  }

}
