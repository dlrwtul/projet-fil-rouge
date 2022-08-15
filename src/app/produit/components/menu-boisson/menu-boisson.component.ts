import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/shared/services/event-service.service';
import { MenuTaille } from '../../shared/models/menu-taille';
import { CommandeMenuBoissonTaille } from 'src/app/shared/models/commande-menu-boisson-taille';

@Component({
  selector: 'ild-menu-boisson',
  templateUrl: './menu-boisson.component.html',
  styleUrls: ['./menu-boisson.component.css']
})
export class MenuBoissonComponent implements OnInit {

  @Input('menuTaille') menuTaille:MenuTaille|null = null;
  @Input('quantite') quantite : number = 0
  @Input() commandeMenuBoissonTaillesMod: CommandeMenuBoissonTaille[] | undefined = []
  @Output() emiter : EventEmitter<number> = new EventEmitter 
  @Output() emiter2: EventEmitter<[number,CommandeMenuBoissonTaille[]]> = new EventEmitter
  block: boolean = false;
  tot : number = 0;
  commandeMenuBoissonTailles : CommandeMenuBoissonTaille[] = []

  constructor(private eventServ: EventService) { }

  ngOnInit(): void {
    this.eventServ.getEventObs().subscribe(data => {
      if (this.menuTaille != null) {
        if (data ==null) {
          this.tot = structuredClone(this.menuTaille.quantite)*this.quantite
        }else {
          this.tot = this.tot + structuredClone(this.menuTaille.quantite)*data
          if (this.tot != 0) {
            this.block = false
          }else {
            this.emiter.emit(1)
            this.block = true
          }
        }
      }
    })

    if (this.menuTaille != null && this.commandeMenuBoissonTaillesMod != []) {
      this.tot = structuredClone(this.menuTaille.quantite)*this.quantite
    }
  }

  getVal(tab:[number,number|undefined,number,boolean]){

    if (this.menuTaille != null) {
      this.tot += tab[0]
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

    if (tab[1] != undefined) {

      let exist:boolean = false;
      let index = 0

      this.commandeMenuBoissonTailles.forEach(data => {
        if (data.boissonTaille?.id == tab[1]) {
          exist = true
          index = this.commandeMenuBoissonTailles.indexOf(data)
        }
      })

      if ((!tab[3] && exist) || tab[2]==0) {
        this.commandeMenuBoissonTailles.splice(index,1)
      } else if (tab[3]) {
        if (exist) {
          this.commandeMenuBoissonTailles[index].quantite = tab[2]
        }else {
          let commandeMenuBoissonTaille :CommandeMenuBoissonTaille = {
            quantite:tab[2],
            boissonTaille:{
              id:tab[1],
              quantiteStock:0,
            }
          }
          this.commandeMenuBoissonTailles.push(commandeMenuBoissonTaille)
        }
      }

      if (this.block && this.menuTaille?.taille.id != undefined) {
        this.emiter2.emit([this.menuTaille?.taille.id,this.commandeMenuBoissonTailles])
      }
    }

  }

  sendBlock() {
    if (this.block) {
      this.emiter.emit(1)
    }else {
      this.emiter.emit(-1)
    }
  }

}
