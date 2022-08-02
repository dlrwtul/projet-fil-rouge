import { Injectable } from '@angular/core';

const TOKEN = "token"

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token : string){
    window.sessionStorage.setItem(TOKEN,token)
  }

  getToken():any {
    return window.sessionStorage.getItem(TOKEN)
  }

  clearToken(){
    window.sessionStorage.removeItem(TOKEN)
  }

}
