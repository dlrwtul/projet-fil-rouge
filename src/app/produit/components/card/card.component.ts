import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { Produit } from '../../shared/models/produit';
import { CommandeProduit } from '../../../shared/models/commande-produit';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ild-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit,AfterViewInit {

  @ViewChild('bgImg') content!: ElementRef;
  @Input('produit') produit : Produit | null = null;
  quantiteVal : number = 1;
  @ViewChild('quantite') quantite!: ElementRef<HTMLInputElement>;
  commandeBurger : CommandeProduit = {
    quantite : 0,
    produit : undefined,
  };

  constructor(private panierServ : PanierService,private router : Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const divEl: HTMLDivElement = this.content.nativeElement;
    divEl.style.backgroundImage = `url('data:image/png;base64,${this.produit?.image}')`;
  }

  onValueChange(value: any) {
    if (isNaN(parseInt(value))) {
      this.quantiteVal = 1;
    }else {
      this.quantiteVal = parseInt(value)
    }
  }

  plus() {
    this.quantiteVal += 1;
  }

  moins() {
    if (this.quantiteVal > 1) {
      this.quantiteVal -= 1;
    } else {
      this.quantite.nativeElement.style.border = '3px solid red';
      setTimeout(() => {
        this.quantite.nativeElement.style.border = 'none';
      }, 2000);
    }
  }

  addBtn() {

    if (this.produit?.type == "Burger") {
      this.commandeBurger.produit = this.produit
      this.commandeBurger.quantite = this.quantiteVal
      this.commandeBurger.prix = this.produit.prix
      this.panierServ.addCommandeBurger(this.commandeBurger)
    } else {
      this.router.navigate([ "/client/produit",{ outlets: { sidebar: ["details",this.produit?.id] } }],{ queryParams :{data: this.quantiteVal}})
    }

  }

}
