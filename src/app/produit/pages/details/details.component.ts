import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Complement } from '../../shared/models/complement';
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
  quitRoute : string = '';
  topVal: number = 0;
  produit : Produit | null = null;
  complement$ : Observable<Complement> | null = null;

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router,private activatedRoute:ActivatedRoute,private store: ProduitDataStoreService) {

  }

  ngOnInit(): void {

    this.topVal = this.document.documentElement.scrollTop;

    const id = this.activatedRoute.snapshot.params['id']
    let type : string = this.activatedRoute.snapshot.params['type']
    let enterPoint:string = `${type.toLowerCase()}s`

    this.store.get$(id,enterPoint).subscribe( (x) => {
      this.produit = x
    });

    this.complement$ = this.store.complement$()

    this.quitRoute = this.router.url
    if (this.router.url == `/client/produit/(sidebar:details/${type}/${id})`) {
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
    /* const divEl2: HTMLDivElement = this.bgImg.nativeElement;
    console.log(this.produit)
    divEl2.style.backgroundImage = `url('data:image/png;base64,${this.produit?.image}')`; */
  }



}

