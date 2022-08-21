import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError, timeout } from 'rxjs';
import { Produit } from '../models/produit';
import { Catalogue } from '../models/catalogue';
import { Complement } from '../models/complement';
import { DetailsProduitComplement } from '../models/details-produit-complement';
import { TokenService } from 'src/app/authentification/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitDataStoreService {

  url: string = 'https://lang-projet-fil-rouge-api.herokuapp.com/api/';

  constructor(private http:HttpClient,private tokenServ : TokenService) { }

  catalogue$ = ():Observable<Catalogue> => {
    return this.http.get<Catalogue>(`${this.url}catalogues/1`)
  }

  produits$ = (key : string):Observable<any> => {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenServ.getToken()}`
      })
    };

    return this.http.get<any>(`${this.url}${key}`,options).pipe(
      map(data => {
        return data["hydra:member"]
      }),
    )
  }

  produits2$ = (key : string,parpage : number,page :number = 1):Observable<any> => {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenServ.getToken()}`
      })
    };
      return this.http.get<any>(`${this.url}${key}?parpage=${parpage}&&page=${page}&&isEtat=true`,options).pipe(
        // map(data => {
        //   data["hydra:member"].forEach((element:any) => {
        //     if (!element.isEtat) {
        //       console.log(data["hydra:member"].splice(data["hydra:member"].indexOf(element),1))
        //       data["hydra:member"].splice(data["hydra:member"].indexOf(element),1)
        //     }
        //   });
        //   return data
        // })
        )
  }

  complement$ = ():Observable<Complement> => {
    return this.http.get<Complement>(`${this.url}complements/1`)
  }

  get$ = (id:number,enterPoint: string) => {
    return this.http.get<Produit>(`${this.url}${enterPoint}/${id}`)
  }

  delete$ = (id:number):Observable<any> => {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.tokenServ.getToken()}`
      })
    };
    return this.http.delete<any>(`${this.url}produits/${id}`,options)
  }

  getWithComplements$ = (id:number) => {
    return this.http.get<DetailsProduitComplement>(`${this.url}detailsProduitComplements/${id}`).pipe(
      timeout(10000),
      map(data => {
        if (data.menu != null) {
          data.produit = data.menu;
        }
        if (data.burger != null) {
          data.produit = data.burger;
        }
        return data
      })
    )
  }

  newProduit$ = (produit:FormData,key : string):Observable<Produit> => {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenServ.getToken()}`,
    })
    return this.http.post<Produit>(`${this.url}${key}`,produit,{
      headers : headers
    })
  }

}
