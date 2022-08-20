import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenService } from 'src/app/authentification/shared/services/token.service';
import { Zone } from 'src/app/shared/models/zone';

@Injectable({
  providedIn: 'root'
})
export class ZonesCommandesStoreService {

  constructor(private http : HttpClient,private tokenServ : TokenService) { }

  options = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json+ld',
       'Authorization': `Bearer ${this.tokenServ.getToken()}`
    })
  };
  
  $zoneCommandes = ():Observable<Zone[]> => {
    return this.http.get<Zone[]>(`https://lang-projet-fil-rouge-api.herokuapp.com/api/zones/commandes`,this.options).pipe(
      
      map((data:any) => {
        
        return data["hydra:member"] as Zone[]
      }),
      catchError((err) => {
        return throwError(() => console.log(err.error.message))
      })

    )
  }
}
