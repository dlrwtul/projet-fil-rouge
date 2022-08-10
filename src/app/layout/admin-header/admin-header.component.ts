import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ild-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @ViewChild('messages') messages!: ElementRef;
  @ViewChild('parameters') parameters!: ElementRef;
  @Output() emitter : EventEmitter<any> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
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
