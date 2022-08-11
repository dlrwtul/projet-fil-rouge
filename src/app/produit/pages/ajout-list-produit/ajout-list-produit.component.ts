import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Produit } from '../../shared/models/produit';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';
@Component({
  selector: 'ild-ajout-list-produit',
  templateUrl: './ajout-list-produit.component.html',
  styleUrls: ['./ajout-list-produit.component.css']
})
export class AjoutListProduitComponent implements OnInit {

  produit : Produit|null = null
  url : any
  myForm : FormGroup = new FormGroup({})
  tabProduits : any[] = ["burgers","portion_frites","tailles"]
  
  constructor(private builder : FormBuilder,private produitServ : ProduitDataStoreService,private toast : NgToastService) { }

  ngOnInit(): void {
    this.url = "https://fakeimg.pl/350x200/?text=Choisir&font=arial"
    this.myForm = this.builder.group({
      nom : ['',Validators.required],
      file : ['',Validators.required],
      prix : ['',Validators.required]
    })
  }

  submit(key : string){
    this.produit = this.myForm.value
    if (this.produit != null) {
      this.produitServ.newProduit$(this.produit,key).subscribe({
        next:(value:any) => {
          this.toast.success({detail:"SUCCESS",summary:"Nouveau produit ajouté",position:'tl',duration:5000});
        },
        error:(err:any) => {
          const errMess = err.error.message
          console.log(err)
          this.toast.error({detail:"Error Produit",summary:errMess,position:'tl',duration:5000});
        },
      })
    }
  }

  imagePreview(event : any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}

    var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.url = reader.result;
		}
	}

  addProduit(element : HTMLDivElement) {
  }


}
