import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentification/shared/services/auth.service';
import { Commande } from 'src/app/shared/models/commande';
import { PanierService } from 'src/app/shared/services/panier-service.service';

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
  commande$ : Observable<Commande> | null = null
  constructor(private router: Router,private panierServ : PanierService,private authServ : AuthService) { }

  ngOnInit(): void {
    this.isConnected = this.authServ.isAuthentificated()
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
    this.commande$ = this.panierServ.getCommande()
      
  }

  logout(){
    this.authServ.logout()
    window.location.reload()
  }

}
