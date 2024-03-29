import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthentificationComponent,
    LayoutComponent,
    LoginComponent,
    SigninComponent,
  ],
  imports: [
  CommonModule,
    AuthentificationRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthentificationModule { }
