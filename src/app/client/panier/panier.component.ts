import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ild-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  public isCollapsed = true;
  page = 4;
  items : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  pageSize : number = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
