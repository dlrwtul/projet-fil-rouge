import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService{

  private childClickedEvent = new BehaviorSubject<number>(0);

  emitChildEvent(value: number){
      this.childClickedEvent.next(value)
  }

  childEventListner(){
      return this.childClickedEvent.asObservable();

    } 

}
   
