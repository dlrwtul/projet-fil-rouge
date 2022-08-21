import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Commande } from '../models/commande';
import { Quartier } from '../models/quartier';
import { Zone } from '../models/zone';
import { CommandeBoissonTaille } from '../models/commande-boisson-taille';
import { CommandeProduit } from 'src/app/shared/models/commande-produit';
const PANIER_KEY = "current-panier"

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panier : Commande = {
    zone : {},
    quartier:{
      zone : {}
    },
    commandeBoissonTailles:[],
    commandeBurgers:[],
    commandeMenus : [],
    commandePortionFrites: []
  }
  private commandePanier : BehaviorSubject<Commande> = new BehaviorSubject(this.panier);
  constructor() { }

  setZone(zone : Zone) {
    return this.commandePanier?.next({
      ...this.commandePanier.value,zone:zone
    })
  }

  setTelephone(telephone : string) {
    return this.commandePanier?.next({
      ...this.commandePanier.value,telephone:telephone
    })
  }

  setAdresse(adresse : string) {
    return this.commandePanier?.next({
      ...this.commandePanier.value,adresse:adresse
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
    if (this.commandePanier.value.commandeBoissonTailles == undefined) {
      this.commandePanier.value.commandeBoissonTailles = []
    }
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
    console.log(this.panier);
    
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

  delete(commandeProduit: CommandeProduit | CommandeBoissonTaille) {
    let index :number|undefined = 0;
    if (commandeProduit.type == "CommandeBoissonTaille") {
      this.commandePanier.value.commandeBoissonTailles?.map(data => {
        if (data.boissonTaille?.id == commandeProduit.boissonTaille?.id) {
          index = this.commandePanier.value.commandeBoissonTailles?.indexOf(data)
          if (index != undefined) { 
            this.commandePanier.value.commandeBoissonTailles?.splice(index,1)
          }
        }
      })
    } else {
      if (commandeProduit.produit?.type == "Menu") {
        this.commandePanier.value.commandeMenus?.map(data => {
          if (data.produit?.id == commandeProduit.produit?.id) {
            index = this.commandePanier.value.commandeMenus?.indexOf(data)
            if (index != undefined) { 
              this.commandePanier.value.commandeMenus?.splice(index,1)
            }
          }
        })
      }else if (commandeProduit.produit?.type == "Burger") {
        this.commandePanier.value.commandeBurgers?.map(data => {
          if (data.produit?.id == commandeProduit.produit?.id) {
            index = this.commandePanier.value.commandeBurgers?.indexOf(data)
            if (index != undefined) { 
              this.commandePanier.value.commandeBurgers?.splice(index,1)
            }
          }
        })
      }else {
        this.commandePanier.value.commandePortionFrites?.map(data => {
          if (data.produit?.id == commandeProduit.produit?.id) {
            index = this.commandePanier.value.commandePortionFrites?.indexOf(data)
            if (index != undefined) { 
              this.commandePanier.value.commandePortionFrites?.splice(index,1)
            }
          }
        })
      }
    }
    return this.commandePanier?.next
  }

  getCommandeObject() {
    return this.commandePanier.asObservable().pipe(
      map(data => {
        if (this.commandePanier.value.commandeBoissonTailles?.length == 0) {
          delete this.commandePanier.value.commandeBoissonTailles
        }else if (this.commandePanier.value.commandeBurgers?.length == 0) {
          delete this.commandePanier.value.commandeBurgers
        } else if (this.commandePanier.value.commandeMenus?.length == 0) {
          delete this.commandePanier.value.commandeMenus
        }else if (this.commandePanier.value.commandePortionFrites?.length == 0) {
          delete this.commandePanier.value.commandePortionFrites
        }
        delete this.commandePanier.value.commandeProduits
        return data
      })
    )
  }

  viderPanier() {    
    return this.commandePanier?.next(this.panier)
  }

  savePanier(){
    window.sessionStorage.removeItem(PANIER_KEY)
    window.sessionStorage.setItem(PANIER_KEY,JSON.stringify(this.commandePanier.value))
  }

  restorePanier(){
    let data = window.sessionStorage.getItem(PANIER_KEY)
    if (data != null) {
      this.commandePanier = new BehaviorSubject(JSON.parse(data))  
    }
  }

}
