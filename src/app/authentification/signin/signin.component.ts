import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'ild-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  previousUrl = ''
  text = ["Se Connecter","/securite/login"]
  private user : User = {
    login : "",
    planPassword: ""
  }
  myForm : FormGroup = new FormGroup({})

  constructor(private formBuilder : FormBuilder,private toast : NgToastService,private tokenServ : TokenService,private authServ : AuthService,private activatedRouter : ActivatedRoute) { }

  ngOnInit(): void {
    this.previousUrl = this.activatedRouter.snapshot.queryParams['previousUrl']

    this.myForm = this.formBuilder.group({
      login: new FormControl('',[Validators.required,Validators.email]),
      planPassword : new FormControl('',[Validators.required]),
      confirmPassword : new FormControl('',[Validators.required]),
      nom : new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      prenom : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
      telephone: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(9),Validators.minLength(9)]),
      adresse : new FormControl('',[Validators.required]),
    })
    
  }

  onSubmit(form : FormGroup){
    this.user = form.value
    
    this.authServ.$inscription(this.user,"clients/register").subscribe({
      next:(value:any)=> {
        this.toast.warning({detail:"EMAIL confirmation",summary:'Veuillez confirmer votre email .',position:'tl',duration:5000});
      },
      error:(err:any)=>{
        const errMess = err.error.message
        this.toast.error({detail:"Error Inscription",summary:errMess,position:'tl',duration:5000});
      },
      complete() {}
    })
  }

}
