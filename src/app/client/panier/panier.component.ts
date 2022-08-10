import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentification/shared/services/auth.service';
import { Commande } from 'src/app/shared/models/commande';
import { Quartier } from 'src/app/shared/models/quartier';
import { Zone } from 'src/app/shared/models/zone';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { ZoneStoreService } from 'src/app/shared/services/zone-store.service';
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
  quartier : Quartier = {}
  num=0
  commande$ : Observable<Commande> |undefined = undefined ; 
  commande : Commande = {}
  quartiers$ : Observable<Quartier[]> | undefined = undefined
  constructor(private formBuilder : FormBuilder,private panierServ: PanierService,private toast : NgToastService,private zoneStoreServ : ZoneStoreService,private commandeServ : CommandeStoreService,private changeDetector:ChangeDetectorRef,private authServ : AuthService,private router : Router,private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.commande$ = this.panierServ.getCommande();
    this.myForm = this.formBuilder.group({
      quartier : ["",Validators.required],
      adresse : ["",Validators.required],
      telephone : ["",Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(9),Validators.minLength(9)]
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

  validCommande(){
    if (this.authServ.isAuthentificated()) {
      
      this.panierServ.getCommandeObject().subscribe((data) => this.commande = data)
      if (!this.isCollapsed) {
        this.commande.telephone = this.myForm.value.telephone
        this.commande.adresse = this.myForm.value.adresse
        this.quartiers$?.subscribe(data => this.commande.quartier = data[this.myForm.value.quartier])
        this.commande.zone = this.commande.quartier?.zone
      }

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
