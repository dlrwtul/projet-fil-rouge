import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventService } from 'src/app/shared/services/event-service.service';

@Component({
  selector: 'ild-plus-moins',
  templateUrl: './plus-moins.component.html',
  styleUrls: ['./plus-moins.component.css']
})
export class PlusMoinsComponent implements OnInit {
  @Input('block') block: boolean = false ;
  @Input() checked: boolean = false;
  pastQute : number = 0
  @Input() lpQuantite :number = 0;
  @Input() quantiteVal : number = 0;
  @ViewChild('inputQuantite') quantite!: ElementRef<HTMLInputElement>;
  @ViewChild('plusBtn') plusBtn!: ElementRef<HTMLInputElement>;
  @Output() emiter : EventEmitter<[number,number]> = new EventEmitter

  constructor(private eventServ : EventService) { }

  ngOnInit(): void {

  }

  plus() {
    if (this.block == false) {
      this.quantiteVal += 1;
      this.emiter.emit([-1,this.quantiteVal])
    } else {
      this.plusBtn.nativeElement.style.backgroundColor = "red"
      setTimeout(() => {
        this.plusBtn.nativeElement.style.backgroundColor = "gray"
      }, 2000);
    }
  }

  moins() {
    if (this.quantiteVal > 0) {
      this.quantiteVal -= 1;
      this.emiter.emit([1,this.quantiteVal])
    } else {
      this.quantite.nativeElement.style.border = '3px solid red';
      setTimeout(() => {
        this.quantite.nativeElement.style.border = 'none';
      }, 2000);
    }
  }

  getVal(value : string){
    if (!isNaN(parseInt(value))) {
      if (parseInt(value) > this.quantiteVal) {
        this.quantiteVal = parseInt(value)
        this.emiter.emit([-parseInt(value),this.quantiteVal])
      }else {
        this.emiter.emit([this.quantiteVal- parseInt(value),this.quantiteVal])
        this.quantiteVal = parseInt(value)
      }
      this.pastQute = structuredClone(this.quantiteVal)
    }
  }

  getValKp(value : string){
    if (value == "") {
      this.emiter.emit([this.quantiteVal,this.quantiteVal])
      this.quantiteVal = 0
    }
  }

}
