import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Commande } from 'src/app/shared/models/commande';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { CommandeStoreService } from '../../../commande/shared/services/commande-store.service';

@Component({
  selector: 'ild-card-commande',
  templateUrl: './card-commande.component.html',
  styleUrls: ['./card-commande.component.css']
})
export class CardCommandeComponent implements OnInit,OnChanges {
  @Input() commande : Commande | null = null
  @Input() checkAll : boolean|undefined  = false
  @Output() emitter : EventEmitter<boolean> = new EventEmitter
  checked = false
  constructor(private livrasonServ: LivraisonService,private commandeServ : CommandeStoreService) { }

  ngOnInit(): void {
  }

  changeCheck() {
    if (this.commande?.etat == 'en cours') {
      this.checked = !this.checked
      this.emitter.emit(this.checked)
      if (this.checked) {
        this.livrasonServ.addCommande(this.commande)
      }else {
        this.livrasonServ.removeCommande(this.commande)

      }
    }
  }

  valideCommande(){
    if (this.commande?.id != null) {
      this.commandeServ.$changerEtat(this.commande?.id,"valide").subscribe({
        next:(value:Commande)=> {
            this.commande = value
        },
        error:(err) => {
          console.log(err);
        },
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {   
    if (changes['checkAll'] == undefined) {
      return
    }
    if (changes['checkAll'].currentValue && this.commande?.etat == 'en cours') {
      this.checked = true
      this.livrasonServ.addCommande(this.commande)
      return
    }
    if (this.commande != null) {
      this.livrasonServ.removeCommande(this.commande)
    }
    this.checked = false
  }

}
