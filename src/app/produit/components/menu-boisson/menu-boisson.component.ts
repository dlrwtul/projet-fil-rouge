import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event-service.service';
import { MenuTaille } from '../../shared/models/menu-taille';

@Component({
  selector: 'ild-menu-boisson',
  templateUrl: './menu-boisson.component.html',
  styleUrls: ['./menu-boisson.component.css']
})
export class MenuBoissonComponent implements OnInit {

  @Input('menuTaille') menuTaille:MenuTaille|null = null;
  block: boolean = false;
  total :number = 0;

  constructor(private eventServ: EventService) { }

  ngOnInit(): void {
  }

  getVal(value:number){
    console.log(value)
  }

}
