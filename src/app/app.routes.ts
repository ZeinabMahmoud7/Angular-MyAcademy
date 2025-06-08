import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { AvilableTracksComponent } from '../Components/student_Dashoard/avilable-tracks/avilable-tracks.component';
import { ExamsComponent } from '../Components/student_Dashoard/exams/exams.component';
import { ProfileComponent } from '../Components/student_Dashoard/profile/profile.component';
import { ResultComponent } from '../Components/student_Dashoard/result/result.component';
import { ForwardComponent } from '../Components/student_Dashoard/forward/forward.component';
import { SignUpComponent } from '../Components/student_Dashoard/signup/signup.component';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'course-tracks/:id',component:AvilableTracksComponent},
  {path:'exam/:id',component:ExamsComponent},
  {path:'profile',component:ProfileComponent},
  {path:'result',component:ResultComponent},
  {path:'',component:ForwardComponent}
];
