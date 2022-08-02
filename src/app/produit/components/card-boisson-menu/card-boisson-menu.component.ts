import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
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
  avaliable : boolean = false
  @ViewChild('bgImg') content!: ElementRef;
  @ViewChild('checkbox') checkbox!: ElementRef;
  @Output() emiter : EventEmitter<[number,(number|undefined),number,boolean]> = new EventEmitter
  quantiteVal:number = 0;

  constructor(private eventServ: EventService,private toast : NgToastService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const divEl: HTMLDivElement = this.content.nativeElement;
    divEl.style.backgroundImage = `url('./assets/img/${this.boissonTaille?.boisson?.nom}.jpg')`;
  }

  sendToP(tab : [number,number]){
    if (this.checkbox.nativeElement.checked == true) {
      this.quantiteVal = tab[1];
      this.emiter.emit([tab[0],this.boissonTaille?.id,this.quantiteVal,true]);
      if (this.quantiteVal == this.boissonTaille?.quantiteStock) {
        this.block = true
        this.toast.warning({detail:"WARNING",summary:"Stock de boisson epuisé !!!",position:'lr',duration:5000});
      }
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
      this.emiter.emit([num,this.boissonTaille?.id,this.quantiteVal,this.checkbox.nativeElement.checked])
    }
  }

}
