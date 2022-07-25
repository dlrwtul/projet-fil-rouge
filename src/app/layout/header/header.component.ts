import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ild-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  linkText :string = '';
  linkUri :string = '';
  isConnected:boolean = true;
  @Input('showNav') showNav:string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url == "/client/commande") {
      console.log('commande')
      this.linkText = 'Catalogue'
      this.linkUri = "/client/produit"
    } else {
      console.log('catalogue')
      this.linkText = 'Mes Commandes'
      this.linkUri = "/client/commande"
    }
  }

  

}
