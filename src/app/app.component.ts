import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slider } from './animations-router';
import { AuthService } from './authentification/shared/services/auth.service';
import { TokenService } from './authentification/shared/services/token.service';
import { PanierService } from './shared/services/panier-service.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations : [slider]
})

export class AppComponent implements AfterViewInit,OnInit {

  @ViewChild('nav') navBar!: ElementRef;
  @ViewChild('messages') messages!: ElementRef;
  @ViewChild('parameters') parameters!: ElementRef;
  isAdmin :boolean = false;
  loading :boolean = true;
  title : string = 'projet-fil-rouge';
  timeToLive : any

  constructor(private panierServ : PanierService,private router : Router,private authServ : AuthService,private tokenServ : TokenService){

  }

  ngOnInit(): void {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const url = (<NavigationEnd>event).url;
          if (url.split("/")[1] == "admin") {
            this.isAdmin = true
          }

        }
    });
    let decoded : any = jwt_decode(this.tokenServ.getToken())  
    // this.timeToLive = setInterval(() => {
    //   const date = new Date();
    //   const seconds = date.getTime()/1000
    //   console.log(parseInt(decoded['iat']) - seconds);
    //   if ((parseInt(decoded['iat']) - seconds) <= 0) {
    //     this.authServ.logout()
    //     window.location.reload()
    //   }
    // }, 1000);
    
  }

  prepareRouteOutlet(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander($event : any) {
      this.panierServ.savePanier();
    }

  // @HostListener('window:load',['$event'])
  //   unloadHandler($event : any) {
  //     this.panierServ.restorePanier();
  //   }
    
  ngAfterViewInit(): void {
    this.panierServ.restorePanier();
  }

  toggleNav() {
    this.navBar.nativeElement.classList.toggle('hide')
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

  logout(){
    this.authServ.logout()
    window.location.reload()
  }

}
