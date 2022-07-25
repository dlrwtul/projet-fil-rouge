import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ild-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isConnected:boolean = true;
  @Input('showNav') showNav:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
