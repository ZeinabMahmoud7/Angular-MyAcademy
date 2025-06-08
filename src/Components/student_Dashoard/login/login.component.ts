import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', Validators.required)
  });

  get getEmail() {
    return this.loginForm.get('Email');
  }

  get getPassword() {
    return this.loginForm.get('Password');
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.get('Email')?.value;
    const password = this.loginForm.get('Password')?.value;

    // Admin Data
    const adminEmail = 'admin123@gmail.com';
    const adminPassword = 'admin123';

    if (email === adminEmail && password === adminPassword) {
      alert('Welcome Admin!');
      this.router.navigate(['/adminExam']);
    } else {
      this.router.navigate(['/adminExam']);
    }

    this.loginForm.reset();
  }
}
