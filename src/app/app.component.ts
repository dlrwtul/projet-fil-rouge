import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './animations-router';
import { PanierService } from './shared/services/panier-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider,
  ]
})
export class AppComponent implements AfterViewInit {
  loading :boolean = true;
  title = 'projet-fil-rouge';

  constructor(private panierServ : PanierService){

  }

  prepareRouteOutlet(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData &&  outlet.activatedRouteData['animation'];
  }

  @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander($event : any) {
      console.log("bain")
      this.panierServ.savePanier();
    }

  // @HostListener('window:load',['$event'])
  //   unloadHandler($event : any) {
  //     this.panierServ.restorePanier();
  //   }
    
  ngAfterViewInit(): void {
    this.panierServ.restorePanier();
  }

}
