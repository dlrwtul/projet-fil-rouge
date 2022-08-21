import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Produit } from 'src/app/produit/shared/models/produit';

@Component({
  selector: 'ild-card-produit',
  templateUrl: './card-produit.component.html',
  styleUrls: ['./card-produit.component.css']
})
export class CardProduitComponent implements OnInit {

  @ViewChild('bgImg') bgImg!: ElementRef
  @Input() produit : Produit | null = null
  constructor() { }

  ngOnInit(): void {
    this.bgImg.nativeElement.style.backgroundImage = `url('data:image/png;base64,${this.produit?.image}')`;
  }

}
