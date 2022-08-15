import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'ild-lut-accordion',
  templateUrl: './lut-accordion.component.html',
  styleUrls: ['./lut-accordion.component.css']
})
export class LutAccordionComponent implements OnInit,OnChanges {

  @Input() key : string = ''
  @Input('isSubmitted') isSubmitted : boolean = false
  quantiteVal : number = 0
  quitted = false
  data$ : Observable<any> = new Observable<any>
  @ViewChild('la_body') la_body! : ElementRef
  @ViewChild('select') select! : ElementRef
  @Output() emitter : EventEmitter<any> = new EventEmitter

  constructor(private produitServ : ProduitDataStoreService,private menuServ :MenuService) { }

  ngOnInit(): void {
    this.data$ = this.produitServ.produits$(this.key)
  }

  hideBody(element : HTMLDivElement){
    this.la_body.nativeElement.classList.toggle('hide')
    element.classList.toggle('notClicked')
  }

  sendTop(value_comp : string,select_value:string) {
    if (isNaN(parseInt(value_comp)) || parseInt(value_comp) < 1) {
      if (select_value != "") {
        this.quantiteVal = 1
      }
      return
    }
    this.emitter.emit([this.key,parseInt(value_comp),parseInt(select_value)])
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if ( this.quantiteVal > 0 && !this.quitted ) {
      this.menuServ.addComponent(this.quantiteVal,parseInt(this.select.nativeElement.value),this.key)
    }
  }

}
