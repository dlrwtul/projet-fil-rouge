import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { TokenService } from '../shared/services/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from 'src/app/shared/services/event-service.service';

@Component({
  selector: 'ild-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  previousUrl:any
  text = ["S'inscrire","/securite/signin"]
  private token : string = ''
  user : User = {
    id : 0,
    login : "",
    password : ""
  }
  connexion$ : Observable<any> = new Observable
  myForm : FormGroup = new FormGroup({})

  constructor(private authServ : AuthService,private tokenServ : TokenService,private formBuilder : FormBuilder,private toast : NgToastService,private activatedRouter: ActivatedRoute,private router : Router,private eventServ : EventService) { }

  ngOnInit(): void {
    this.previousUrl = this.activatedRouter.snapshot.queryParams['previousUrl']
    //==========================================================
    //option 1
    //==========================================================

    // this.myForm = new FormGroup({
    //   login : new FormControl(),
    //   password : new FormControl()
    // })

    //==========================================================
    //option 2
    //==========================================================

    this.myForm = this.formBuilder.group({
      login: ['',[Validators.required,Validators.email]],
      password : ['',Validators.required]
    })
  }

  connect(){
    this.connexion$ = this.authServ.$connexion(this.user)
    this.tokenServ.setToken(this.token)
  }

  sendMessError(message: string){
    this.toast.warning({detail:"Require form",summary:message,position:'tl',duration:10000});
  }

  onSubmit(form : FormGroup){
    this.user.login = form.value.login
    this.user.password = form.value.password
    this.connexion$ = this.authServ.$connexion(this.user)
    this.connexion$.subscribe({
      next:(value:any)=> {
        this.tokenServ.setUser(this.user)
        this.tokenServ.setToken(value.token)
        this.toast.success({detail:"SUCCESS",summary:'Connexion reussie',position:'tl',duration:5000});
        if (this.previousUrl != null) {
          if (this.previousUrl == '/client/panier') {
            this.router.navigate(['/client/commande'])
          }else {
            this.router.navigate([this.previousUrl])
          }
        } else {
          this.router.navigate([''])
        }
      },
      error:(err:any)=>{
        const errMess = err.error.message
        this.toast.error({detail:"Error Connexion",summary:errMess,position:'tl',duration:5000});
      },
      complete() {}
    })
      
  }
}
