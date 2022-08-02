import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { TokenService } from './token.service';


const SECURITY_API_URL = "https://lang-projet-fil-rouge-api.herokuapp.com/api/"
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected : boolean = false

  constructor(private http:HttpClient,private tokenServ : TokenService) { }

  isAuthentificated(){
    const token :any = this.tokenServ.getToken()
    if (token != null) {
      this.isConnected = true
    }
    return this.isConnected
  }

  $connexion = (user : User):Observable<any> => {
    return this.http.post<any>(`${SECURITY_API_URL}login`,user,options).pipe(
      catchError((err) => {
        return throwError(() => new Error("Identifiants Invalides"))
      })
    )
  }

  $inscription = (user : User,role : string):Observable<any> => {
    return this.http.post<any>(`${SECURITY_API_URL}${role}`,user,options)
  }

  logout() {
    this.tokenServ.clearToken()
  }

}
