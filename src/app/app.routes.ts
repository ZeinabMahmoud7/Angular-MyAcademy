import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { SignUpComponent } from '../Components/signup/signup.component';
import { AvilableTracksComponent } from './../Components/avilable-tracks/avilable-tracks.component';
import { QuestionComponent } from '../Components/question/question.component';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path: 'course-tracks/:id',component:AvilableTracksComponent},
  {path:'questions',component:QuestionComponent},
  {path:'',component:SignUpComponent}
];
