import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { map, Observable } from 'rxjs';
import { CommandeMenuBoissonTaille } from 'src/app/shared/models/commande-menu-boisson-taille';
import { CommandeProduit } from 'src/app/shared/models/commande-produit';
import { EventService } from 'src/app/shared/services/event-service.service';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { DetailsProduitComplement } from '../../shared/models/details-produit-complement';
import { Produit } from '../../shared/models/produit';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';

@Component({
  selector: 'ild-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild('details') details!: ElementRef;
  @ViewChild('toile') toile!: ElementRef;
  @ViewChild('bgImg') bgImg!: ElementRef;
  @ViewChild('quantite') quantite!: ElementRef<HTMLInputElement>;
  tabCommandeMenuBoissonTailles : ([number,CommandeMenuBoissonTaille[]])[] = [];
  commandeMenuBoissonTailles: CommandeMenuBoissonTaille[] = []
  nbrBlockCheck = 0;
  quitRoute : string = '';
  checkedBoissons : number[] = []
  topVal: number = 0;
  produitComplements : Observable<DetailsProduitComplement> | null = null;
  quantiteVal : number = 1;
  menu:Produit| null = null
  commandeProduit : CommandeProduit = {
    quantite : 0,
    produit : undefined,
    type:"CommandeProduit"
  };

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router,private activatedRoute:ActivatedRoute,private store: ProduitDataStoreService,private panierServ: PanierService,private toast : NgToastService,private eventServ : EventService) {

  }

  ngOnInit(): void {

    
    this.topVal = this.document.documentElement.scrollTop;
    
    const id = this.activatedRoute.snapshot.params['id']
    const data = parseInt(this.activatedRoute.snapshot.queryParams['data'])
    this.quantiteVal = data;

    this.eventServ.getEventObs().subscribe(data => {
      if (typeof data.quantite == "number") {
        this.quantiteVal = data.quantite
        this.menu = data.menu
      }
    });

    if (this.menu == null) {
      this.produitComplements = this.store.getWithComplements$(id)
    }else {
      this.produitComplements = this.store.getWithComplements$(id).pipe(
        map(data => {
          if (this.menu != null) {
            data.produit = this.menu
          }
          return data
        })
      )
    }

    this.quitRoute = this.router.url
    if (this.router.url == `/client/produit/(sidebar:details/${id})?data=${this.activatedRoute.snapshot.queryParams['data']}`) {
      this.document.documentElement.style.overflowY = 'hidden';
    }
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflowY = 'auto';
    this.toile.nativeElement.style.display = "none"
  }

  ngAfterViewInit(): void {
    let exp = this.document.documentElement.scrollTop;
    const divEl: HTMLDivElement = this.details.nativeElement;
    divEl.style.top = `${exp}px`;
    this.toile.nativeElement.style.display = "block"
    this.toile.nativeElement.style.top = `${exp}px`
  }

  onValueChange(value: any) {
    if (isNaN(value) || value <= 0) {
      this.quantiteVal = 1;
      this.quantite.nativeElement.style.border = '3px solid red';
      setTimeout(() => {
        this.quantite.nativeElement.style.border = 'none';
      }, 2000);
    }else {
      this.nbrBlockCheck = 0
      this.eventServ.setToBihavior(value-this.quantiteVal)
      this.quantiteVal = value
    }
  }

  plus() {
    this.quantiteVal += 1;
  }

  moins() {
    if (this.quantiteVal > 1) {
      this.quantiteVal -= 1;
    } else {
      this.quantite.nativeElement.style.border = '3px solid red';
      setTimeout(() => {
        this.quantite.nativeElement.style.border = 'none';
      }, 2000);
    }
    
  }

  activeBtn(value:number) {
    this.nbrBlockCheck+=value
  }

  addBtn(produit : Produit) {
    this.commandeProduit.quantite = this.quantiteVal
    this.commandeProduit.prix = produit.prix
    if (produit.type == "Menu") {
      this.commandeProduit.menu = produit
      this.commandeProduit.menu.commandeMenuBoissonTailles = this.setCommandeMenuBoissonTailles()
      this.commandeProduit.produit = this.commandeProduit.menu
      this.panierServ.addCommandeMenu(this.commandeProduit)
    } else {
      this.commandeProduit.burger = produit
      this.commandeProduit.produit = this.commandeProduit.burger
      this.panierServ.addCommandeBurger(this.commandeProduit)
    }
    this.toast.success({detail:"SUCCESS",summary:'Nouveau Produit Ajoutée',position:'tr',duration:5000});
  }

  getCommandeMenuBoissonTailles(tab: [number,CommandeMenuBoissonTaille[]]) {    
    if (this.checkedBoissons.indexOf(tab[0]) == -1) {
      this.checkedBoissons.push(tab[0])
      this.tabCommandeMenuBoissonTailles.push(tab)
    } else {
      this.tabCommandeMenuBoissonTailles.forEach(element => {
        if (element[0] == tab[0]) {
          element[1]=tab[1]
        }
      });
    }
  }

  setCommandeMenuBoissonTailles(){
    this.tabCommandeMenuBoissonTailles.forEach(element => {
      this.commandeMenuBoissonTailles = [...this.commandeMenuBoissonTailles,...element[1]]
    });
    return this.commandeMenuBoissonTailles
  }

}

