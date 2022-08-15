import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Quartier } from '../models/quartier';

@Injectable({
  providedIn: 'root'
})
export class QuartierStoreService {

  url: string = 'https://lang-projet-fil-rouge-api.herokuapp.com/api/quartiers';

  constructor(private http:HttpClient) { }

  quartiers$ = ():Observable<Quartier[]> => {
    return this.http.get<any>(`${this.url}`).pipe(
      map(data => {
        return data["hydra:member"]
      })
    )
  }
}
