import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventService } from 'src/app/shared/services/event-service.service';

@Component({
  selector: 'ild-plus-moins',
  templateUrl: './plus-moins.component.html',
  styleUrls: ['./plus-moins.component.css']
})
export class PlusMoinsComponent implements OnInit {

  quantiteVal : number = 0;
  @ViewChild('inputQuantite') quantite!: ElementRef<HTMLInputElement>;
  @Output() emiter : EventEmitter<number> = new EventEmitter

  constructor(private eventServ : EventService) { }

  ngOnInit(): void {
  }

  plus() {
    this.quantiteVal += 1;
  }

  moins() {
    if (this.quantiteVal > 0) {
      this.quantiteVal -= 1;
    } else {
      this.quantite.nativeElement.style.border = '3px solid red';
      setTimeout(() => {
        this.quantite.nativeElement.style.border = 'none';
      }, 2000);
    }
  }

  sendToGrandParent(value:number){
    this.emiter.emit(value)
  }

}
