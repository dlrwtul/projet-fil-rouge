import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommandeProduit } from 'src/app/shared/models/commande-produit';
import { EventService } from 'src/app/shared/services/event-service.service';
import { PanierService } from 'src/app/shared/services/panier-service.service';
import { Complement } from '../../shared/models/complement';
import { DetailsProduitComplement } from '../../shared/models/details-produit-complement';
import { Produit } from '../../shared/models/produit';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';

@Component({
  selector: 'ild-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('bgImg') bgImg!: ElementRef;
  @ViewChild('quantite') quantite!: ElementRef<HTMLInputElement>;
  nbrBlockCheck = 0;
  quitRoute : string = '';
  topVal: number = 0;
  produitComplements : Observable<DetailsProduitComplement> | null = null;
  quantiteVal : number = 1;
  commandeProduit : CommandeProduit = {
    quantite : 0,
    produit : undefined,
  };

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router,private activatedRoute:ActivatedRoute,private store: ProduitDataStoreService,private panierServ: PanierService) {

  }

  ngOnInit(): void {

    this.topVal = this.document.documentElement.scrollTop;

    const id = this.activatedRoute.snapshot.params['id']
    const data = parseInt(this.activatedRoute.snapshot.queryParams['data'])
    this.quantiteVal = data;
    this.produitComplements = this.store.getWithComplements$(id)
    this.quitRoute = this.router.url
    if (this.router.url == `/client/produit/(sidebar:details/${id})?data=${this.activatedRoute.snapshot.queryParams['data']}`) {
      this.document.documentElement.style.overflowY = 'hidden';
    }
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflowY = 'auto';
  }

  ngAfterViewInit(): void {
    let exp = this.document.documentElement.scrollTop;
    const divEl: HTMLDivElement = this.content.nativeElement;
    divEl.style.top = `${exp}px`;
  }

  onValueChange(value: any) {
    if (isNaN(parseInt(value))) {
      this.quantiteVal = 1;
    }else {
      this.quantiteVal = parseInt(value)
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
    console.log(this.nbrBlockCheck)
  }

  addBtn(produit : Produit) {
    this.commandeProduit.produit = produit
    this.commandeProduit.quantite = this.quantiteVal
    this.commandeProduit.prix = produit.prix
    if (produit.type == "Menu") {
      this.panierServ.addCommandeMenu(this.commandeProduit)
    } else {
      this.panierServ.addCommandeBurger(this.commandeProduit)
    }
  }

}

