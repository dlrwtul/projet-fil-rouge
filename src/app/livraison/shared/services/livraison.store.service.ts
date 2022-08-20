import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenService } from 'src/app/authentification/shared/services/token.service';
import { Livraison } from 'src/app/shared/models/livraison';
import { Livreur } from '../models/livreur';

@Injectable({
  providedIn: 'root'
})
export class LivraisonStoreService {

  constructor(private http : HttpClient,private tokenServ : TokenService) { }

  options = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${this.tokenServ.getToken()}`
    })
  };
  
  $livreurs = ():Observable<Livreur[]> => {
    let options = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json+ld',
         'Authorization': `Bearer ${this.tokenServ.getToken()}`
      })
    };
    return this.http.get<Livreur[]>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/livreurs`,options).pipe(
      
      map((data:any) => {
        return data["hydra:member"] as Livreur[]
      }),
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })

    )
  }

  $livraisons = (etat : string):Observable<Livraison[]> => {
    let options = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json+ld',
         'Authorization': `Bearer ${this.tokenServ.getToken()}`
      })
    };
    return this.http.get<Livraison[]>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/livraisons?etat=${etat}`,options).pipe(
      
      map((data:any) => {
        return data["hydra:member"] as Livraison[]
      }),
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })

    )
  }

  newLivraison$ = (livraison : Livraison):Observable<Livraison> => {
    return this.http.post<Livraison>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/livraisons`,livraison,this.options).pipe(
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })
    )
  }

  changeEtatLivraison$ = (id : number,etat : string):Observable<Livraison> => {
    let livraison : Livraison = {
      etat : etat
    }
    return this.http.put<Livraison>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/livraisons/${id}`,livraison,this.options).pipe(
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })
    )
  }
}
