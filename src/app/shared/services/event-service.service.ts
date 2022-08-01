import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from 'src/app/produit/shared/models/produit';

@Injectable({
  providedIn: 'root'
})

export class EventService{

  private childClickedEvent = new BehaviorSubject<Produit | null>(null);

  emitChildEvent(produit: Produit){
      this.childClickedEvent.next(produit)
  }

  childEventListner(){
    return this.childClickedEvent.asObservable();
  } 

}
   
