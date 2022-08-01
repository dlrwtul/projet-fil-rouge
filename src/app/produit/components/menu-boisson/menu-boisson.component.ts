import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/shared/services/event-service.service';
import { MenuTaille } from '../../shared/models/menu-taille';

@Component({
  selector: 'ild-menu-boisson',
  templateUrl: './menu-boisson.component.html',
  styleUrls: ['./menu-boisson.component.css']
})
export class MenuBoissonComponent implements OnInit {

  @Input('menuTaille') menuTaille:MenuTaille|null = null;
  @Output() emiter : EventEmitter<number> = new EventEmitter 
  block: boolean = false;
  tot : number = 0;

  constructor(private eventServ: EventService) { }

  ngOnInit(): void {
    if (this.menuTaille != null) {
      this.tot = structuredClone(this.menuTaille.quantite)
    }
  }

  getVal(value:number){
    if (this.menuTaille != null) {
      this.tot += value
      if (this.tot == 0) {
        this.emiter.emit(1)
        this.block = true
      }else {
        if (this.block) {
          this.emiter.emit(-1)
        }
        this.block = false
      }
    }
  }

  sendBlock() {
    if (this.block == true) {
      this.emiter.emit(1)
    }else {
      this.emiter.emit(-1)
    }
  }

}
