import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './animations-router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider,
  ]
})
export class AppComponent {
  loading :boolean = true;
  title = 'projet-fil-rouge';

  prepareRouteOutlet(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData &&  outlet.activatedRouteData['animation'];
  }

}
