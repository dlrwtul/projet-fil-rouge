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
  @ViewChild('bgImg') content!: ElementRef;
  @Output() emiter : EventEmitter<number> = new EventEmitter

  constructor(private eventServ: EventService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const divEl: HTMLDivElement = this.content.nativeElement;
    divEl.style.backgroundImage = `url('./assets/img/${this.boissonTaille?.boisson.nom}.jpg')`;
  }

  sendToP(value : number){
    this.emiter.emit(value)
  }


}
