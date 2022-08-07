import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from 'src/app/authentification/shared/services/token.service';
import { Commande } from 'src/app/shared/models/commande';

const API_URL = "https://lang-projet-fil-rouge-api.herokuapp.com/api/commandes"


@Injectable({
  providedIn: 'root'
})
export class CommandeStoreService {

  constructor(private http : HttpClient,private tokenServ : TokenService) { }

  $newCommande = (commande : Commande):Observable<any> => {

    const options = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.tokenServ.getToken()}`
      })
    };
    return this.http.post(`${API_URL}`,commande,options).pipe(
      catchError((err) => {
        return throwError(() => err)
      })
    )
  }
}
