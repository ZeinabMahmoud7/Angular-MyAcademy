import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { CourrsesService } from '../services/courrses.service';

@Component({
  selector: 'app-sign-up',
   standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  mainCourses:any[]=[]
constructor(private userData:UserDataService,private router:Router,private courses:CourrsesService)
{

}
  ngOnInit(): void {
    this.courses.getAllCourses().subscribe(
      {
       next:(data)=>
      {
       this.mainCourses=data
       console.log(this.mainCourses);
      },
      error:(err)=>
      {
        console.log(err)
      }
      }
    )
  }
  registerForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(6)
    ]),
    Email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(9)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', Validators.required),
    courseName: new FormControl('', Validators.required),
    StudentId: new FormControl('', Validators.required)
  }, {
    validators: (form: AbstractControl): ValidationErrors | null => {
      const pass = form.get('Password')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    }
  });

  get getName() {
    return this.registerForm.get('Name');
  }

  get getEmail() {
    return this.registerForm.get('Email');
  }

  get getPassword() {
    return this.registerForm.get('Password');
  }

  get getConfirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

   get getGender() {
    return this.registerForm.get('gender');
  }

 get getCourseName() {
    return this.registerForm.get('courseName');
  }

 get getStudentId() {
    return this.registerForm.get('StudentId');
  }
  onSubmit() {
  if (!this.registerForm.valid) {

    this.registerForm.markAllAsTouched();
    return
  }
  const FormValue=this.registerForm.value;
  const selectedCourseId = FormValue.courseName;

  const EnteredUserData=
  {
    name:FormValue.Name as string,
    email:FormValue.Email as string,
    courseName:FormValue.courseName as string,
    studentId:Number(FormValue.StudentId)
  }

  alert("Registered Successfully")
  this.userData.setUserData(EnteredUserData).subscribe(
    {
      next:()=>
      {
        this.router.navigate(['/course-tracks',selectedCourseId])
      }
    }
  )
  this.registerForm.reset();

}
}
