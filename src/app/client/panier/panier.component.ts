import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { first, map, Observable, timeout, timestamp } from 'rxjs';
import { AuthService } from 'src/app/authentification/shared/services/auth.service';
import { Commande } from 'src/app/shared/models/commande';
import { Quartier } from 'src/app/shared/models/quartier';
import { Zone } from 'src/app/shared/models/zone';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { QuartierStoreService } from 'src/app/shared/services/zone-store.service';
import { CommandeStoreService } from './shared/services/commande-store.service';

@Component({
  selector: 'ild-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  isCollapsed = true;
  montantTotal : number = 0;
  myForm : FormGroup = new FormGroup({})
  zone : Zone = {}
  quartier : Quartier = {
    zone : {}
  }
  num=0
  commande$ : Observable<Commande> |undefined = undefined ; 
  commande : Commande = {}
  quartiers$ : Observable<Quartier[]> | undefined = undefined
  constructor(private formBuilder : FormBuilder,private panierServ: PanierService,private toast : NgToastService,private quartierStroreServ : QuartierStoreService,private commandeServ : CommandeStoreService,private changeDetector:ChangeDetectorRef,private authServ : AuthService,private router : Router,private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.quartiers$ = this.quartierStroreServ.quartiers$()
    this.commande$ = this.panierServ.getCommande();
    this.myForm = this.formBuilder.group({
      quartier : ["",Validators.required],
      adresse : ["",Validators.required],
      telephone : ["",Validators.required]
    })
    if (this.activatedRouter.snapshot.queryParams['previousUrl'] != null) {
      this.validCommande()
    }
  }

  getMontant(value :number) {
    this.montantTotal += value
    this.changeDetector.markForCheck()
  }

  getChangeInfo(value : boolean) {
    this.commande$ = this.panierServ.getCommande();
  }

  getQuartier(id : number){    
    this.quartiers$?.subscribe((data : Quartier[]) =>
      data.forEach((qt:Quartier) => {
        if (qt.id == id) {   
          this.panierServ.setQuartier(qt)
          this.panierServ.setZone(qt.zone)
          this.panierServ.setAdresse(this.myForm.value.adresse)
          this.panierServ.setTelephone(this.myForm.value.telephone)
          first()
        }
      }))
  }

  stringify(data:any){
    return JSON.stringify(data)
  }

  validCommande(){

    if (!this.isCollapsed) {   
      this.quartier.id = JSON.parse(this.myForm.value.quartier)[0]
      this.zone.id = JSON.parse(this.myForm.value.quartier)[1]
      this.panierServ.setQuartier(this.quartier)
      this.panierServ.setZone(this.zone)
      this.panierServ.setAdresse(this.myForm.value.adresse)
      this.panierServ.setTelephone(this.myForm.value.telephone)
    }  

    if (this.authServ.isAuthentificated()) {
      
      this.panierServ.getCommandeObject().subscribe((data) => {
        this.commande = data
      }) 

      this.commandeServ.$newCommande(this.commande).subscribe({
        next:(value:any) => {
          this.panierServ.viderPanier()
          this.toast.success({detail:"SUCCESS",summary:"Commande Validée",position:'tl',duration:5000});
          this.router.navigate(["/client/commande"])
        },
        error:(err:any) => {
          const errMess = err.error.message
          console.log(err)
          this.toast.error({detail:"Error Commande",summary:errMess,position:'tl',duration:5000});
        }
      })

    } else {
      let currentUrl = this.router.url
      this.router.navigate(["/securite/login"],{ queryParams: { previousUrl : currentUrl }})
    }
  }

}
