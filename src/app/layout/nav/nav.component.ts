import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ild-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('nav') navBar!: ElementRef;
  @ViewChild('messages') messages!: ElementRef;
  @ViewChild('parameters') parameters!: ElementRef;
  @Output() emitter : EventEmitter<boolean> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }

  toggleNav() {
    this.navBar.nativeElement.classList.toggle('hide')
    this.emitter.emit(this.navBar.nativeElement.classList.contains('hide'))
  }

  toggleMessages() {
    if (this.parameters.nativeElement.classList.contains('show')) {
      this.parameters.nativeElement.classList.remove('show')
    }
    this.messages.nativeElement.classList.toggle('show')
  }

  toggleParameters () {
    if (this.messages.nativeElement.classList.contains('show')) {
      this.messages.nativeElement.classList.remove('show')
    }
    this.parameters.nativeElement.classList.toggle('show')
  }
}
