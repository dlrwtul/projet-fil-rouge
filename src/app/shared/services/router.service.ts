import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router :Router) { }

  getCurrentUrl() {
    return this.router.url
  }

  getPreviousUrl(){
    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd)
    //  => {
    //   return event.url
    // })
  }
}
