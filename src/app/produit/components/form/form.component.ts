import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Produit } from '../../shared/models/produit';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'ild-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  isSubmitted = false
  produit : Produit = {
    nom :'',
    prix:0,
    type :'',
    description : '',
    menuBurgers : [],
    menuPortionFrites : [],
    menuTailles : []
  }
  url : any
  checkInvalid = false
  @Input() key :string = ''
  @Output() emitter : EventEmitter<[Produit,string]> = new EventEmitter
  myForm : FormGroup = new FormGroup({})
  tabProduits : any[] = ["burgers","portion_frites","tailles"]
  formData : FormData = new FormData
  prixs : string | number = ''

  constructor(private menuServ : MenuService,private toast : NgToastService,private builder : FormBuilder) { }

  ngOnInit(): void {
    if (this.key == "menus") {
      this.prixs = 0
    }
    this.url = "https://fakeimg.pl/350x200/?text=Choisir&font=arial"
    this.myForm = this.builder.group({
      nom : ['',Validators.required],
      file : [null, [Validators.required]],
      prix : [this.prixs,Validators.required],
      description : ['']
    })
  }

  imagePreview(event : any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      return;
		}
    if (this.produit != null) {
      this.produit.file = event.target.files[0] 
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

  submit(){
    if (this.myForm.valid) {
      if (this.key == "menus") {
        if (!this.isSubmitted) {
          this.isSubmitted = true
        }else {
          this.isSubmitted = false
        }
      }
  
      if (this.produit != null) {
        this.produit.nom = this.myForm.get('nom')?.value
        this.produit.prix = this.myForm.get('prix')?.value
        this.produit.description = this.myForm.get('description')?.value
      }
  
      if (this.key == "menus") {
        this.menuServ.getEventObs().subscribe(data => {
          if (this.produit != null) {
            this.produit.menuBurgers = data.menuBurgers
            this.produit.menuTailles = data.menuTailles
            this.produit.menuPortionFrites = data.menuPortionFrites
          }
        })
  
        setTimeout(async () => {
          if (this.produit != null) {
  
            this.menuServ.viderSubject()
  
            if (this.produit.menuBurgers?.length == 0) {
              this.toast.error({detail:"Error Menu",summary:"Veuillez choisir au moins un Burger",position:'tl',duration:5000});
              return
            }
            if (this.produit.menuTailles?.length == 0 && this.produit.menuPortionFrites?.length == 0) {
              this.toast.error({detail:"Error Menu",summary:"Veuillez choisir au moins un Complement",position:'tl',duration:5000});
              return
            }
  
            if (this.produit != null) {
              this.emitter.emit([this.produit,this.key])
            }
  
            this.tabProduits = []
            this.tabProduits = ["burgers","portion_frites","tailles"]
          }
        }, 50);
      }
  
      if (this.produit != null && this.key != "menus") {
        this.emitter.emit([this.produit,this.key])
      }
  
    }else {
      this.checkInvalid = true
    }

  }

}
