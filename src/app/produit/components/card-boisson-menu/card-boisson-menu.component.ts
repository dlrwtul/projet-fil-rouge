import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs';
import { EventService } from 'src/app/shared/services/event-service.service';
import { BoissonTaille } from '../../shared/models/boisson-taille';

@Component({
  selector: 'ild-card-boisson-menu',
  templateUrl: './card-boisson-menu.component.html',
  styleUrls: ['./card-boisson-menu.component.css']
})
export class CardBoissonMenuComponent implements OnInit,AfterViewInit {
  @Input('boissonTaille') boissonTaille:BoissonTaille|null = null;
  @Input('block') block: boolean = false ;
  @ViewChild('bgImg') content!: ElementRef;
  @ViewChild('checkbox') checkbox!: ElementRef;
  @Output() emiter : EventEmitter<number> = new EventEmitter
  quantiteVal:number = 0;

  constructor(private eventServ: EventService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const divEl: HTMLDivElement = this.content.nativeElement;
    divEl.style.backgroundImage = `url('./assets/img/${this.boissonTaille?.boisson.nom}.jpg')`;
  }

  sendToP(tab : [number,number]){
    if (this.checkbox.nativeElement.checked == true) {
      this.quantiteVal = tab[1];
      this.emiter.emit(tab[0]);
    }
  }

  changeVal(){
    let num = 0;
    if (this.checkbox.nativeElement.checked) {
      num = -1;
    }else {
      num = 1;
    }
    for (let index = 0; index < this.quantiteVal; index++) {
      this.emiter.emit(num)
    }
  }


}
