import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/produit/shared/models/produit';
import { EventService } from 'src/app/shared/services/event-service.service';
import { PanierService } from 'src/app/shared/services/panier-service.service';

@Component({
  selector: 'ild-ligne-produit',
  templateUrl: './ligne-produit.component.html',
  styleUrls: ['./ligne-produit.component.css']
})
export class LigneProduitComponent implements OnInit {

  @Input() commandeProduit : any;
  @Output() emiter : EventEmitter<number> = new EventEmitter
  @Output() emiterChange : EventEmitter<boolean> = new EventEmitter
  produit : Produit | null = null;
  total : number = 0;

  constructor(private panierServ : PanierService, private router : Router,private eventServ : EventService) { }

  ngOnInit(): void {

    if (this.commandeProduit?.hasOwnProperty("boissonTaille")) {
      this.produit = this.commandeProduit.boissonTaille.boisson
    }else {
      this.produit = this.commandeProduit.produit      
    }
    this.getTotal()
    this.emiter.emit(this.total)
    console.log(this.commandeProduit);
    
  }

  getVal(tab:[number,number]) {
    if (tab[1] > 0) {
      this.commandeProduit.quantite = tab[1]
      if (this.produit?.type != "Menu") {
        this.getTotal()
        this.emiter.emit(-1*this.commandeProduit.prix*tab[0])
        this.emiterChange.emit(true)
      }else {
        this.modify()
      }
    }
  }

  deleteProduit(){
    this.emiterChange.emit(true)
    this.emiter.emit(-1*this.total)
    this.panierServ.delete(this.commandeProduit)
  }

  getTotal() {
    if (this.commandeProduit?.hasOwnProperty("boissonTaille")) {
      this.total = this.commandeProduit.boissonTaille.taille.prix * this.commandeProduit.quantite
    }else {
      this.total = this.commandeProduit.produit.prix * this.commandeProduit.quantite
    }
  }

  modify(){
    this.eventServ.setToBihavior(this.commandeProduit)
    this.router.navigate(["client","panier",{ outlets: { sidebar: [ 'details', this.produit?.id ] }}]);  
  }

}
