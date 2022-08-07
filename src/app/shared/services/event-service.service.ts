import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from 'src/app/produit/shared/models/produit';

@Injectable({
  providedIn: 'root'
})

export class EventService{

  private childClickedEvent = new BehaviorSubject<any>(null);

  setToBihavior(data: any){
      this.childClickedEvent.next(data)
  }

  getEventObs(){
    return this.childClickedEvent.asObservable();
  } 

}
   
