import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ild-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  quitRoute : string = '';

  topVal: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router) {

  }

  ngOnInit(): void {
    this.topVal = this.document.documentElement.scrollTop;
    this.quitRoute = this.router.url
    if (this.router.url == '/client/produit/(sidebar:details/1)') {
      this.document.documentElement.style.overflowY = 'hidden';
    }
    
  }

  ngOnDestroy(): void {
    this.document.documentElement.style.overflowY = 'auto';
  }

  ngAfterViewInit(): void {
    let exp = this.document.documentElement.scrollTop;
    const divEl: HTMLDivElement = this.content.nativeElement;
    divEl.style.top = `${exp}px`;
    console.log(divEl.style.top);
  }

}
