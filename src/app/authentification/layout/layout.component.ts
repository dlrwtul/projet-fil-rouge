import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ild-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() text : string[] = []
  @Input() previousUrl : string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
