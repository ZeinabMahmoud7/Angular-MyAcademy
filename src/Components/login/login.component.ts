import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  savedEmail: string | null = null;
  constructor()
  {}
  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
   Role:new FormControl('',Validators.required)
  });
  get getName()
  {
   return this.loginForm.get('Name')
  }
   get getEmail()
  {
   return this.loginForm.get('Email')
  }
   get getRole()
  {
   return this.loginForm.get('Role')
  }

 onSubmit() {
  if (!this.loginForm.valid) {
    this.loginForm.markAllAsTouched();
    return;
  }
  const enteredEmail = this.loginForm.get('Email')?.value;
  if (enteredEmail !== this.savedEmail) {
    alert('This email does not exist');
    return;
  }
  alert('Login Successfully');
  this.loginForm.reset();
}

}
