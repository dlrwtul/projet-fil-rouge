import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Livreur } from '../../shared/models/livreur';
import { LivraisonStoreService } from '../../shared/services/livraison.store.service';

@Component({
  selector: 'ild-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit,OnDestroy {

  @ViewChild('couverture') couverture!: ElementRef
  livreurs$ : Observable<Livreur[]>|null = null 
  constructor(private livraisonServ : LivraisonStoreService) { }

  ngOnInit(): void {
    this.livreurs$ = this.livraisonServ.$livreurs()
  }

  ngOnDestroy(): void {
  }

}
