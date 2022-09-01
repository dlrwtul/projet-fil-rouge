import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Livraison } from 'src/app/shared/models/livraison';
import { LivraisonService } from 'src/app/shared/services/livraison.service';
import { Livreur } from '../../shared/models/livreur';
import { LivraisonStoreService } from '../../shared/services/livraison.store.service';

@Component({
  selector: 'ild-card-livreur',
  templateUrl: './card-livreur.component.html',
  styleUrls: ['./card-livreur.component.css']
})
export class CardLivreurComponent implements OnInit {

  @Input() livreur : Livreur | null = null
  livraison : Livraison = {
    livreur : {
      id : 0
    },
    commandes : []
  }
  livraison$ : any
  constructor(private livraisonServ : LivraisonService,private livServ : LivraisonStoreService,private toast : NgToastService,private router :Router ) 
  {

  }

  ngOnInit(): void {    
  }

  newLivraison() {
    if (this.livreur != null) {
      if (this.livraison.livreur) {
        this.livraison.livreur.id = this.livreur?.id
        
      }
      this.livraisonServ.getLivraison().subscribe(data => {        
        this.livraison.commandes = data.commandes
      })
      if (this.livraison.commandes?.length == 0) {
        this.toast.warning({detail:"WARNING",summary:"Veuillez selectionner des commandes",position:'tr',duration:5000});  
        return 
      }
      this.livServ.newLivraison$(this.livraison).subscribe({
        next:(value:Livraison) => {
          console.log(value);
          this.livraison = value
          this.toast.success({detail:"SUCCESS",summary:'Livraison Ajoutée',position:'tr',duration:5000});
          this.router.navigate(["/admin/livraison"])
        },
        error:(err) => {
          this.toast.error({detail:"WARNING",summary:"Livraison echouée",position:'tr',duration:5000});   
        },
      })
    }
  }

  finishLivraison() {

  }

}
