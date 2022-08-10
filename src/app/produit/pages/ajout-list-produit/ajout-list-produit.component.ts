import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'ild-ajout-list-produit',
  templateUrl: './ajout-list-produit.component.html',
  styleUrls: ['./ajout-list-produit.component.css']
})
export class AjoutListProduitComponent implements OnInit {

  myForm : FormGroup = new FormGroup({})
  constructor(private builder : FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.builder.group({
      nom : ['',Validators.required],
      file : ['',Validators.required],
      prix : ['',Validators.required]
    })
  }

  submit(){
    
  }

}
