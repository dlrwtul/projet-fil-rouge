import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quartier } from '../models/quartier';

@Injectable({
  providedIn: 'root'
})
export class ZoneStoreService {

  url: string = 'https://lang-projet-fil-rouge-api.herokuapp.com/api/zones';

  constructor(private http:HttpClient) { }

  zone$ = ():Observable<Quartier[]> => {
    return this.http.get<Quartier[]>(`${this.url}`)
  }
}
