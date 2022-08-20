import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Livraison } from '../shared/models/livraison';
import { Zone } from '../shared/models/zone';
import { ZonesCommandesStoreService } from './shared/services/zones-commandes-store.service';
import { LivraisonStoreService } from './shared/services/livraison.store.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'ild-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {

  nbr : number = 0
  enCours = "en cours"
  termine = "termine"
  enCoursLivraison = "en cours de livraison"
  valide = "valide"
  annule = "annule"
  filterVal : string = this.enCours;
  zones$ : Observable<Zone[]> | null = null
  livraisons$ : Observable<Livraison[]> | null = null
  constructor(private zoneCommandesServ : ZonesCommandesStoreService,private livraisonServ : LivraisonStoreService,private toast : NgToastService) { }

  ngOnInit(): void {
    this.zones$ = this.zoneCommandesServ.$zoneCommandes()
    this.livraisons$ = this.livraisonServ.$livraisons(this.enCours)
  }

  onValChange(value :string){
    this.filterVal = value
  }

  getVal(bool :boolean) {
    if (bool) {
      this.nbr++
      return
    } 
    this.nbr--
  }

  getFilterZoneVal(value : string):string {
    return value
  }

  validerLivraison(id : number|undefined){
    if (id != undefined) {
      this.livraisonServ.changeEtatLivraison$(id,this.valide).subscribe({
        next:(value) => {
          this.toast.success({detail:"SUCCESS",summary:'Livraison Validée',position:'tr',duration:5000});
        },
        error:(err) => {
          this.toast.error({detail:"WARNING",summary:"Livraison erreur",position:'tr',duration:5000});   
          console.log(err);
        },
      })
    }
  }
}
