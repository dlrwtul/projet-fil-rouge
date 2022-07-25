import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ild-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.css']
})
export class MesCommandesComponent implements OnInit {

  page = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
