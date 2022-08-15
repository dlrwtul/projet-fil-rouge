import { Component, destroyPlatform, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Commande } from 'src/app/shared/models/commande';
import { CommandeBoissonTaille } from 'src/app/shared/models/commande-boisson-taille';
import { CommandeProduit } from 'src/app/shared/models/commande-produit';

@Component({
  selector: 'ild-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnChanges {

  @Input() commandes : Commande | null = null
  commande :Commande | null = null
  montant : number = 0
  @Input() etat : string = ''
  enCours = "en cours"
  termine = "termine"
  enCoursLivraison = "en cours de livraison"
  valide = "valide"
  annule = "annule"
  @Input() show : boolean = false
  @ViewChild('details') details!: ElementRef
  @ViewChild('couverture') couverture!: ElementRef
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes["commandes"].currentValue != null ) {
        this.details.nativeElement.style.display = "flex"
        setTimeout(() => {
          this.details.nativeElement.classList.add("show")
          this.couverture.nativeElement.classList.add("show")
        }, 10);
        this.commande = structuredClone(this.commandes)
        this.commande?.commandeProduits?.forEach(el => {
          if (el['@type'] != 'CommandeBoissonTaille') {
            el['@type'] = 'CommandeProduit'
          }
        })
        console.log(this.commande);
      }
      
  }

  quit() {
    this.details.nativeElement.classList.remove("show")
    this.couverture.nativeElement.classList.remove("show")
    setTimeout(() => {
      this.details.nativeElement.style.display = "none"
    }, 500);
  }

  calcMontant(commandeProduit : CommandeProduit|CommandeBoissonTaille):number {
    if (commandeProduit.prix != undefined) {
      return commandeProduit.prix * commandeProduit.quantite
    }
    return 0
  }

}
