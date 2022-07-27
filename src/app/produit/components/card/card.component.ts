import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Produit } from '../../shared/models/produit';

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
  constructor() { }

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

}
