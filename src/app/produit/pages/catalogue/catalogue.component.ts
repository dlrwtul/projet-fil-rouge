import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';
import { MatButtonToggle, MatButtonToggleChange } from '@angular/material/button-toggle';
import { catchError, Observable, timeout } from 'rxjs';
import { Catalogue } from '../../shared/models/catalogue';
import { Complement } from '../../shared/models/complement';
import { Produit } from '../../shared/models/produit';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';

@Component({
  selector: 'ild-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {

  showNav : string = '';
  topVal : number = 0;
  catalogue$ : Observable<Catalogue> | null = null;
  catalogue : Catalogue | null = null;
  fAll :string = 'produits';
  fBurger: string = 'burgers';
  fMenu: string = 'menus';
  filterVal: string = this.fAll;

  constructor(@Inject(DOCUMENT) private document: Document ,private store: ProduitDataStoreService) { }

  ngOnInit(): void {

    this.store.catalogue$().pipe(
      timeout(5000)
    ).subscribe( (x) => {
      this.catalogue = x
      this.catalogue.produits = [...this.catalogue?.burgers,...this.catalogue?.menus];
      }
    );


    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.topVal= window.scrollY;
    if ( window.scrollY > 100) {
      this.showNav = 'show';
    } else {
      this.showNav = '';
    }
  }

  onValChange(value :any) {
    this.filterVal = value;
  }

  

}
