import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';

@Component({
  selector: 'ild-lut-accordion',
  templateUrl: './lut-accordion.component.html',
  styleUrls: ['./lut-accordion.component.css']
})
export class LutAccordionComponent implements OnInit {

  @Input() key : string = ''
  quantiteVal : number = 0
  data$ : Observable<any[]> = new Observable<any[]>
  @ViewChild('la_body') la_body! : ElementRef

  constructor(private produitServ : ProduitDataStoreService) { }

  ngOnInit(): void {
    this.data$ = this.produitServ.produits$(this.key)
    console.log(this.data$)
  }

  hideBody(element : HTMLDivElement){
    this.la_body.nativeElement.classList.toggle('hide')
    element.classList.toggle('notClicked')
  }

}
