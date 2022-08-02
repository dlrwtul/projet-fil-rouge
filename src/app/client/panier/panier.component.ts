import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/authentification/shared/services/auth.service';
import { Commande } from 'src/app/shared/models/commande';
import { Quartier } from 'src/app/shared/models/quartier';
import { Zone } from 'src/app/shared/models/zone';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { ZoneStoreService } from 'src/app/shared/services/zone-store.service';

@Component({
  selector: 'ild-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  public isCollapsed = true;
  montantTotal : number = 0;
  num=0
  commande$ : Observable<Commande> |undefined = undefined ; 
  quartiers$ : Observable<Quartier[]> | undefined = undefined
  constructor(private panierServ: PanierService,private zoneStoreServ : ZoneStoreService,private changeDetector:ChangeDetectorRef,private authServ : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.commande$ = this.panierServ.getCommande();
    //this.quartiers$ = this.zoneStoreServ.zone$()
  }

  getMontant(value :number) {
    this.montantTotal += value
    this.changeDetector.markForCheck()
  }

  getChangeInfo(value : boolean) {
    this.commande$ = this.panierServ.getCommande();
  }

  validCommande(){
    if (this.authServ.isAuthentificated()) {
      console.log("commander")
    } else {
      this.router.navigate(["/sercurite/login"])
    }
  }

}
