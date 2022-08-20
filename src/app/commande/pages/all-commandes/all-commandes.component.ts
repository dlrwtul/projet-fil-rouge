import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
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
  page : number = 1
  first : number = 1
  last : number = 1
  parpage : number = 10
  commandes$ : Observable<Commande[]> = new Observable
  detailsCommande : Commande | null = null
  constructor(private commandeServ : CommandeStoreService) { }

  ngOnInit(): void {
    this.commandes$ = this.commandeServ.$commandes(this.enCours,this.parpage).pipe(
      map(data => {
        if (data["hydra:view"]["hydra:first"] != undefined) {
          this.first = parseInt(data["hydra:view"]["hydra:first"][data["hydra:view"]["hydra:first"].length - 1])
          this.last = parseInt(data["hydra:view"]["hydra:last"][data["hydra:view"]["hydra:last"].length - 1])
        }
        return data["hydra:member"] as Commande[]
      })
    )
    
  }

  onValChange(value :string){
    this.filterVal = value
    this.page = 1
    this.commandes$ = this.commandeServ.$commandes(this.filterVal,this.parpage).pipe(
      map(data => {
        return data["hydra:member"] as Commande[]
      })
    )
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

  filterNumero(value : string) {

    this.commandes$ = this.commandeServ.$commandes(this.filterVal,this.parpage,1,value).pipe(
      map(data => {
        return data["hydra:member"] as Commande[]
      })
    )
  }

  filterDate(value : string){
    this.commandes$ = this.commandeServ.$commandes(this.filterVal,this.parpage,1,'',value).pipe(
      map(data => {
        return data["hydra:member"] as Commande[]
      })
    )
  }

  paginate(sort : string) {
    const value = `hydra:${sort}`
    if (this.commandes$ != null) {
      switch (sort) {
        case 'first':
          this.page = this.first
          break;
      
        case 'previous':
          if (this.page == this.first) {
            return
          }
          this.page --
        break;
    
        case 'next':
          if (this.page == this.last) {
            return
          }
          this.page ++
        break;
    
        case 'last':
          this.page = this.last
        break;
      }      
      this.commandes$ = this.commandeServ.$commandes(this.filterVal,this.parpage,this.page).pipe(
        map(data => {
          return data["hydra:member"] as Commande[]
        })
      )
    }
  }
}
