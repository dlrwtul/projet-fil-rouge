import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { Catalogue } from '../models/catalogue';
import { Complement } from '../models/complement';

@Injectable({
  providedIn: 'root'
})
export class ProduitDataStoreService {

  url: string = 'https://lang-projet-fil-rouge-api.herokuapp.com/api/';

  constructor(private http:HttpClient) { }

  catalogue$ = ():Observable<Catalogue> => {
    return this.http.get<Catalogue>(`${this.url}catalogues/1`)
  }

  complement$ = ():Observable<Complement> => {
    return this.http.get<Complement>(`${this.url}complements/1`)
  }

  get$ = (id:number,enterPoint: string) => {
    return this.http.get<Produit>(`${this.url}${enterPoint}/${id}`)
  }

}
