import { Component, Input, OnInit } from '@angular/core';
import { Produit } from 'src/app/produit/shared/models/produit';

@Component({
  selector: 'ild-ligne-produit',
  templateUrl: './ligne-produit.component.html',
  styleUrls: ['./ligne-produit.component.css']
})
export class LigneProduitComponent implements OnInit {

  @Input() commandeProduit : any;
  produit : Produit | null = null;
  total : number = 0;

  constructor() { }

  ngOnInit(): void {

    if (this.commandeProduit?.hasOwnProperty("boissonTaille")) {

      this.produit = this.commandeProduit.boissonTaille.boisson
      this.total = this.commandeProduit.boissonTaille.taille.prix * this.commandeProduit.quantite

    }else {

      this.produit = this.commandeProduit.produit
      this.total = this.commandeProduit.produit.prix * this.commandeProduit.quantite
      
    }

  }

}
