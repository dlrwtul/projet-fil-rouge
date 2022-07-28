import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  produit: Produit | null = null ;

  constructor() { }

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

}
