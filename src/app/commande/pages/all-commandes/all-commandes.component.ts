import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from 'src/app/shared/models/commande';
import { CommandeStoreService } from '../../shared/services/commande-store.service';

@Component({
  selector: 'ild-all-commandes',
  templateUrl: './all-commandes.component.html',
  styleUrls: ['./all-commandes.component.css']
})
export class AllCommandesComponent implements OnInit {
  isPanier = true
  enCours = "en cours"
  termine = "termine"
  enCoursLivraison = "en cours de livraison"
  valide = "valide"
  annule = "annule"
  filterVal :string = "en cours"
  dates : string[] = []
  page = 1;
  commandes$ : Observable<Commande[]> = new Observable
  detailsCommande : Commande | null = null
  constructor(private commandeServ : CommandeStoreService) { }

  ngOnInit(): void {
    this.commandes$ = this.commandeServ.$commandes(this.enCours)

  }

  onValChange(value :string){
    this.filterVal = value
    this.commandes$ = this.commandeServ.$commandes(this.filterVal)
  }

  changeEtat(id :number|undefined,etat : string ,tr : HTMLTableRowElement) {
    if (id != undefined) {
      let commande : any
      this.commandeServ.$changerEtat(id,etat).subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          console.log(err); 
        },
      })
      console.log(commande);
      
      tr.parentElement?.removeChild(tr)
    }
  }

  charge(commande:Commande) {
    this.detailsCommande = structuredClone(commande)
  }

}
