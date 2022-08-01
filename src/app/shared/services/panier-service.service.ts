import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Commande } from '../models/commande';
import { Quartier } from '../models/quartier';
import { Zone } from '../models/zone';
import { CommandeBoissonTaille } from '../models/commande-boisson-taille';
import { CommandeProduit } from 'src/app/shared/models/commande-produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panier : Commande = {
    zone : undefined,
    quartier:undefined,
    commandeBoissonTailles:[],
    commandeBurgers:[],
    commandeMenus : [],
    commandePortionFrites: []
  }
  private commandePanier : BehaviorSubject<Commande> = new BehaviorSubject(this.panier);
  montantTotal :number =0;

  constructor() { }

  setZone(zone : Zone) {
    return this.commandePanier?.next({
      ...this.commandePanier.value,zone:zone
    })
  }

  setQuartier(quartier : Quartier) {
    return this.commandePanier?.next({
      ...this.commandePanier.value,quartier:quartier
    })
  }

  addCommandeBoissonTaille(commandeBoissonTaille : CommandeBoissonTaille) {

    let isIn =false

    this.commandePanier.value.commandeBoissonTailles?.map(data => {
      if (data.boissonTaille?.id == commandeBoissonTaille.boissonTaille?.id) {
        data.quantite = commandeBoissonTaille.quantite
        isIn = true
      }
      return data
    })
    
    if (!isIn) {
      return this.commandePanier?.next({
        ...this.commandePanier.value,commandeBoissonTailles:this.commandePanier.value.commandeBoissonTailles?.concat(commandeBoissonTaille)
      })
    } else {
      return this.commandePanier?.next
    }

  }

  addCommandeMenu(commandeMenu:CommandeProduit) {
    let isIn =false

    this.commandePanier.value.commandeMenus?.map(data => {
      if (data.produit?.id == commandeMenu.produit?.id) {
        data.quantite = commandeMenu.quantite
        isIn = true
      }
      return data
    })
    
    if (!isIn) {
      return this.commandePanier?.next({
        ...this.commandePanier.value,commandeMenus:this.commandePanier.value.commandeMenus?.concat(commandeMenu)
      })
    } else {
      return this.commandePanier?.next
    }
  }

  addCommandeBurger(commandeBurger:CommandeProduit) {
    let isIn =false

    this.commandePanier.value.commandeBurgers?.map(data => {
      if (data.produit?.id == commandeBurger.produit?.id) {
        data.quantite = commandeBurger.quantite
        isIn = true
      }
      return data
    })

    if (!isIn) {
      return this.commandePanier?.next({
        ...this.commandePanier.value,commandeBurgers:this.commandePanier.value.commandeBurgers?.concat(commandeBurger)
      })
    } else {
      return this.commandePanier?.next
    }
  }

  addCommandePortonFrite(commandePortionFrite:CommandeProduit) {
    let isIn =false

    this.commandePanier.value.commandePortionFrites?.map(data => {
      if (data.produit?.id == commandePortionFrite.produit?.id) {
        data.quantite = commandePortionFrite.quantite
        isIn = true
      }
      return data
    })
    
    if (!isIn) {
      return this.commandePanier?.next({
        ...this.commandePanier.value,commandePortionFrites:this.commandePanier.value.commandePortionFrites?.concat(commandePortionFrite)
      })
    } else {
      return this.commandePanier?.next
    }
  }

  getCommande():Observable<Commande> {
    return this.commandePanier?.asObservable().pipe(
      map(data => {
        if (data.commandeBurgers != undefined) {
          data.commandeProduits = [...data.commandeBurgers]
        }
        if (data.commandeMenus != undefined) {
          if (data.commandeProduits != undefined) {
            data.commandeProduits = [...data.commandeProduits,...data.commandeMenus]
          }
        }
        if (data.commandePortionFrites != undefined) {
          if (data.commandeProduits != undefined) {
            data.commandeProduits = [...data.commandeProduits,...data.commandePortionFrites]
          }
        }
        if (data.commandeBoissonTailles != undefined) {
          if (data.commandeProduits != undefined) {
            data.commandeProduits = [...data.commandeProduits,...data.commandeBoissonTailles]
          }
        }

        return data
      })
    )
  }

  getMontant() {
    this.getCommande().pipe(
      map((data) => {
        if (data.commandeProduits != undefined) {
          data?.commandeProduits.forEach(element => {
            if (element.prix != undefined) {
              this.montantTotal += element.prix
            }
          });
        }
        return data
      })
    )
    return this.montantTotal
  }

  viderPanier() {
    this.panier = {
      zone : undefined,
      quartier:undefined,
      commandeBoissonTailles:[],
      commandeBurgers:[],
      commandeMenus : [],
      commandePortionFrites: [],
      commandeProduits: []
    }
    this.commandePanier = new BehaviorSubject(this.panier)
  }

}
