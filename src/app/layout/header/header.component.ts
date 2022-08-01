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
  showTwo : boolean = false
  @Input('showNav') showNav:string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url == "/client/commande") {
      this.linkText = 'Catalogue'
      this.linkUri = "/client/produit"
    } else {
      this.linkText = 'Mes Commandes'
      this.linkUri = "/client/commande"
    }

    if (this.router.url == "/client/panier") {
      this.showTwo = true
    }
  }

  

}
