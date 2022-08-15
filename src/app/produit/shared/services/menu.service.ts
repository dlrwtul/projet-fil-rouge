import { Injectable } from '@angular/core';
import { BehaviorSubject, timeout, timestamp, timer } from 'rxjs';
import { Produit } from '../models/produit';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSubject = new BehaviorSubject<Produit>({
    nom:'',
    prix :0,
    type:'',
    menuBurgers : [],
    menuPortionFrites : [],
    menuTailles : [],
    issubmitted : false
  });

  addComponent(quantite: number,id : number,key : string){
    let isDedans = false
    if (key == 'burgers') {
      this.menuSubject.value.menuBurgers?.forEach(element => {
        if (element.burger?.id == id) {
          isDedans = true
          element.quantite = quantite
        }
      });
      if (!isDedans) {
        this.menuSubject.value.menuBurgers?.push({
          quantite : quantite,
          burger : {
            id : id,
            nom : "",
            type : '',
            prix :0
          }
        })
      }
    }else if (key == 'tailles') {
      this.menuSubject.value.menuTailles?.forEach(element => {
        if (element.taille?.id == id) {
          isDedans = true
          element.quantite = quantite
        }
      });
      if (!isDedans) {
        this.menuSubject.value.menuTailles?.push({
          quantite : quantite,
          taille : {
            id : id,
            prix :0,
            libelle : '',
            boissonTailles :[]
          }
        })
      }
    } else {
      this.menuSubject.value.menuPortionFrites?.forEach(element => {
        if (element.portionFrites?.id == id) {
          isDedans = true
          element.quantite = quantite
        }
      });
      if (!isDedans) {
        this.menuSubject.value.menuPortionFrites?.push({
          quantite : quantite,
          portionFrites : {
            id : id,
            nom : "",
            type : '',
            prix :0
          }
        })
      }
    }
    return this.menuSubject.next(this.menuSubject.value)
  }

  getEventObs(){
    return this.menuSubject.asObservable()
  }

  viderSubject() {
    this.menuSubject = new BehaviorSubject<Produit>({
      nom:'',
      prix :0,
      type:'',
      menuBurgers : [],
      menuPortionFrites : [],
      menuTailles : [],
    });
  }

  changeSubmitted(bool :boolean) {
    this.menuSubject.value.issubmitted = bool
    return this.menuSubject.next(this.menuSubject.value)
  }

}
