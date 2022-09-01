import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../models/commande';
import { Livraison } from '../models/livraison';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private livraison : Livraison  = {
    livreur: {
      id:0
    },
    commandes : []
  }
  livraisonSubject$ : BehaviorSubject<Livraison> = new BehaviorSubject(this.livraison)
  constructor() { 

  }

  addCommande(commande : Commande) {    
    return this.livraisonSubject$.next({
      ...this.livraisonSubject$.value,commandes:this.livraisonSubject$?.value.commandes?.concat(commande)
    })
  }

  removeCommande(commande : Commande) {
    this.livraisonSubject$.value.commandes?.forEach(element => {
      if (element.id == commande.id) {
        this.livraisonSubject$.value.commandes?.splice(this.livraisonSubject$.value.commandes.indexOf(element),1)
      }
    });
    return this.livraisonSubject$.next
  }

  getLivraison() {
    return this.livraisonSubject$.asObservable()
  }

  viderLivraison() {
    this.livraisonSubject$ = new BehaviorSubject(this.livraison)
    return this.livraisonSubject$.next(this.livraisonSubject$.value)
  }
}
