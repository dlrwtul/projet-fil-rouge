import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CommandeBoissonTaille } from 'src/app/shared/models/commande-boisson-taille';
import { CommandeProduit } from 'src/app/shared/models/commande-produit';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { BoissonTaille } from '../../shared/models/boisson-taille';
import { Produit } from '../../shared/models/produit';

@Component({
  selector: 'ild-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent implements OnInit,AfterViewInit {

  @ViewChild('bgImg') content!: ElementRef;
  @Input('produit') produits: any ;
  quantiteVal : number = 0;
  produit: Produit | null = null ;
  commandeProduit : CommandeProduit = {
    quantite : 0,
    produit : undefined,
    type:"CommandeProduit"
  };

  commandeBoissonTaille : CommandeBoissonTaille = {
    quantite: 0 ,
    boissonTaille: undefined,
    type:"CommandeBoissonTaille"
  }


  constructor(private panierServ : PanierService,private toast : NgToastService) { }

  ngOnInit(): void {
    if (this.produits?.hasOwnProperty('boisson')) {
      this.produit = this.produits.boisson
    }else {
      this.produit = this.produits
    }
  }

  ngAfterViewInit(): void {
    const divEl: HTMLDivElement = this.content.nativeElement;
    if (this.produits?.hasOwnProperty('boisson')) {
      divEl.style.backgroundImage = `url('./assets/img/${this.produits.boisson.nom}.jpg')`;
    }else {
      divEl.style.backgroundImage = `url('data:image/png;base64,${this.produit?.image}')`;
    }
    
  }

  getVal(tab : [number,number]) {
    this.quantiteVal = tab[1]
  }

  addBtn() {

    if (this.produit != null) {
      if (this.quantiteVal > 0) {
        if (this.produit.type == "PortionFrites") {
          this.commandeProduit.produit = this.produit
          this.commandeProduit.portionFrites = this.produit
          this.commandeProduit.quantite = this.quantiteVal
          this.commandeProduit.prix = this.produit.prix
          this.panierServ.addCommandePortonFrite(this.commandeProduit)  
        } else {
          this.commandeBoissonTaille.quantite = this.quantiteVal
          this.commandeBoissonTaille.boissonTaille = this.produits
          this.commandeBoissonTaille.prix = this.commandeBoissonTaille.boissonTaille?.taille?.prix
          this.panierServ.addCommandeBoissonTaille(this.commandeBoissonTaille)
        }
        this.toast.success({detail:"SUCCESS",summary:'Nouveau Produit Ajoutée',position:'tr',duration:5000});
      } else {
        this.toast.error({detail:"ERROR",summary:'Veuiller mettre une quantite valide',position:'tl',duration:5000});
      }
      
    }
  }

}
