import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Produit } from '../../shared/models/produit';
import { ProduitDataStoreService } from '../../shared/services/produit-data-store.service';
import { MenuProduit } from '../../shared/models/menu-produit';
import { MenuService } from '../../shared/services/menu.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'ild-ajout-list-produit',
  templateUrl: './ajout-list-produit.component.html',
  styleUrls: ['./ajout-list-produit.component.css']
})
export class AjoutListProduitComponent implements OnInit {

  isSubmitted = false
  produit : Produit|null = null
  url : any
  key : string = ''
  myForm : FormGroup = new FormGroup({})
  tabProduits : any[] = ["burgers","portion_frites","tailles"]
  formData : FormData = new FormData
  produitsObs$ : Observable<any> | null = null
  produits : Produit[] = []
  page : number = 1
  first : number = 1
  last : number = 0

  
  constructor(private builder : FormBuilder,private produitServ : ProduitDataStoreService,private toast : NgToastService,private menuServ : MenuService) { }

  ngOnInit(): void {
    this.produitsObs$ = this.produitServ.produits2$("produits",7)
    this.produitsObs$.subscribe(data => {
      this.produits = data["hydra:member"]      
      this.first = parseInt(data["hydra:view"]["hydra:first"][data["hydra:view"]["hydra:first"].length - 1])
      this.last = parseInt(data["hydra:view"]["hydra:last"][data["hydra:view"]["hydra:last"].length - 1])
      console.log(this.last);
      
    })
    
  }

  // submit(key : string){
  //   if (!this.isSubmitted) {
  //     this.isSubmitted = true
  //   }else {
  //     this.isSubmitted = false
  //   }
  //   this.produit = this.myForm.value
  //   this.menuServ.getEventObs().subscribe(data => {
  //     if (this.produit != null) {
  //       this.produit.menuBurgers = data.menuBurgers
  //       this.produit.menuTailles = data.menuTailles
  //       this.produit.menuPortionFrites = data.menuPortionFrites
  //     }
      
  //   })

  //   setTimeout(async () => {
  //     if (this.produit != null) {
  //       this.menuServ.viderSubject()
  //       if (this.produit.menuBurgers?.length == 0) {
  //         this.toast.error({detail:"Error Menu",summary:"Veuillez choisir au moins un Burger",position:'tl',duration:5000});
  //         return
  //       }
  //       if (this.produit.menuTailles?.length == 0 && this.produit.menuPortionFrites?.length == 0) {
  //         this.toast.error({detail:"Error Menu",summary:"Veuillez choisir au moins un Complement",position:'tl',duration:5000});
  //         return
  //       }
  //       if (this.produit != null) {
  //         this.formData.append("nom",this.produit.nom)
  //         this.formData.append("menuBurgers",JSON.stringify(this.produit.menuBurgers))
  //         this.formData.append("menuTailles",JSON.stringify(this.produit.menuTailles))
  //         this.formData.append("menuPortionFrites",JSON.stringify(this.produit.menuPortionFrites))
  //         console.log(this.formData.getAll("menuPortionFrites"),this.produit,this.produit.file,this.formData);
          
  //         this.produitServ.newProduit$(this.formData,key).subscribe({
  //           next:(value:any) => {
  //             this.toast.success({detail:"SUCCESS",summary:"Nouveau produit ajouté",position:'tl',duration:5000});
  //           },
  //           error:(err:any) => {
  //             const errMess = err.error.message
  //             console.log(err)
  //             this.toast.error({detail:"Error Produit",summary:errMess,position:'tl',duration:5000});
  //             return
  //           },
  //         })
  //       }
  //       this.tabProduits = []
  //       this.tabProduits = ["burgers","portion_frites","tailles"]
  //     }
  //   }, 50);
    
  // }

  // imagePreview(event : any) {

  //   if(!event.target.files[0] || event.target.files[0].length == 0) {
	// 		return;
	// 	}

  //   var mimeType = event.target.files[0].type;
		
	// 	if (mimeType.match(/image\/*/) == null) {
	// 		return;
	// 	}
		
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(event.target.files[0]);
		
	// 	reader.onload = (_event) => {
	// 		this.url = reader.result;
	// 	}
	// }

  getFormData(tab : [Produit,string]){
    this.formData.set('nom',tab[0].nom)
    this.formData.append('prix',JSON.stringify(tab[0].prix))
    if (tab[0].description != undefined && tab[0].file != undefined) {
      this.formData.append('description',tab[0].description)
      this.formData.append('file',tab[0].file)
    }
    if (tab[1] == "menus") {
      this.formData.append('menuBurgers',JSON.stringify(tab[0].menuBurgers))
      this.formData.append('menuPortionFrites',JSON.stringify(tab[0].menuPortionFrites))
      this.formData.append('menuTailles',JSON.stringify(tab[0].menuTailles))
    }

    this.produitServ.newProduit$(this.formData,tab[1]).subscribe({
      next:(value:any) => {
        console.log(value.json())
        this.toast.success({detail:"SUCCESS",summary:"Nouveau produit ajouté",position:'tl',duration:5000});
      },
      error:(err:any) => {
        const errMess = err.error["hydra:description"]
        console.log(err)
        this.toast.error({detail:"Error Produit",summary:errMess,position:'tl',duration:5000});
        return
      },
    })

  }

  addProduit(element : HTMLDivElement) {
  }

  paginate(sort : string) {
    const value = `hydra:${sort}`
    if (this.produitsObs$ != null) {
      switch (sort) {
        case 'first':
          this.page = this.first
          break;
      
        case 'previous':
          if (this.page == this.first) {
            return
          }
          this.page --
        break;
    
        case 'next':
          if (this.page == this.last) {
            return
          }
          this.page ++
        break;
    
        case 'last':
          this.page = this.last
        break;
      }      
      this.produitServ.produits2$("produits",7,this.page).subscribe(data => {
        this.produits = data["hydra:member"]
      })
    }
  }

  delete(id : number|undefined,tr : HTMLTableRowElement) {
    if (id != undefined) {
      this.produitServ.delete$(id).subscribe(data => console.log(data))
      tr.parentElement?.removeChild(tr)
    }
  }

}
