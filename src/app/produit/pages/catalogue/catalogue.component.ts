import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'ild-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  showNav : boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if ( window.scrollY > 100) {
      this.showNav = true;
    } else {
      this.showNav = false;
    }
  }

}
