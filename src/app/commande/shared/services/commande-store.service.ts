import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { TokenService } from 'src/app/authentification/shared/services/token.service';
import { Commande } from 'src/app/shared/models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeStoreService {

  options = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json+ld',
       'Authorization': `Bearer ${this.tokenServ.getToken()}`
    })
  };

  constructor(private http : HttpClient,private tokenServ : TokenService,private toast : NgToastService ) { }

  $commandesClient = (etat : string):Observable<any> => {
    return this.http.get<any>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/clients/1/commandes?etat=${etat}`,this.options).pipe(
      map(data => {
        return data["hydra:member"]
      }),
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })

    )
  }

  $commandes = (etat : string,parpage : number = 5,page : number = 1,numero : string = '',date : string = ''):Observable<any> => {
    
    if (date != '') {
      let newDate = new Date(date)
      let newStrDate = newDate.toLocaleDateString()
      newStrDate = newStrDate.replace('/','-');
      return this.http.get<any>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/commandes?page=${page}&parpage=${parpage}&createdAt=${newStrDate}`,this.options).pipe(
      
        map(data => {
          return data
        }),
        catchError((err) => {
          return throwError(() => console.log(err.error.message))
        })

      )
    }
    if (numero != '') {
      return this.http.get<any>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/commandes?page=${page}&parpage=${parpage}&numero=${numero}`,this.options).pipe(
      
        map(data => {
          return data
        }),
        catchError((err) => {
          return throwError(() => console.log(err.error.message))
        })

      )
    }
    return this.http.get<any>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/commandes?page=${page}&parpage=${parpage}&etat=${etat}`,this.options).pipe(
      
      map(data => {
        return data
      }),
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })

    )
  }

  $annulerCommande = (id : number):Observable<Commande> => {
    return this.http.put<Commande>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/commandes/${id}/annule`,{},this.options)
  }

  $changerEtat = (id : number,etat : string) => {
    return this.http.put<Commande>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/commandes/${id}/${etat}`,{},this.options).pipe(
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })
    )
  }

}
