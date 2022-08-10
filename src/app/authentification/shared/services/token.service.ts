import { Injectable } from '@angular/core';
import { User } from '../models/user';

const TOKEN = "token"
const USER = "current-user"
const PANIER_KEY = "current-panier"
const EXPIREAT = "expire";
const EXPIREAT_VALUE : number = 1;
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { /* TODO document why this constructor is empty */ }

  setToken(token : string){
    window.sessionStorage.setItem(TOKEN,token)
    setTimeout(() => {
      this.clearToken()
    }, EXPIREAT_VALUE*60*60*1000);
  }

  getToken():any {
    return window.sessionStorage.getItem(TOKEN)
  }

  setUser(user : User) {
    window.sessionStorage.setItem(USER,JSON.stringify(user))
  }

  getUser(){
    let data = window.sessionStorage.getItem(USER)
    if (data == null) {
      return null
    }
    return JSON.parse(data)
  }

  clearToken(){
    window.sessionStorage.clear()
  }

  getRole() {
    let data = window.sessionStorage.getItem(USER)
    if (data == null) {
      return null
    }
    return JSON.parse(data)
  }

}
