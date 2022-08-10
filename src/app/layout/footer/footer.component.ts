import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
@Component({
  selector: 'ild-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  map :any
  isCatalogue = true
  constructor() { }

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: "",
      version: "weekly",
    });
    
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
  }

}
