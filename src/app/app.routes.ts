import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { AvilableTracksComponent } from '../Components/student_Dashoard/avilable-tracks/avilable-tracks.component';
import { ExamsComponent } from '../Components/student_Dashoard/exams/exams.component';
import { ProfileComponent } from '../Components/student_Dashoard/profile/profile.component';
import { ResultComponent } from '../Components/student_Dashoard/result/result.component';
import { ForwardComponent } from '../Components/student_Dashoard/forward/forward.component';
import { SignUpComponent } from '../Components/student_Dashoard/signup/signup.component';
import { ExamFormComponent } from '../Components/Admin-Dashboard/exam-form/exam-form.component';
import { AdminExamComponent } from '../Components/Admin-Dashboard/admin-exam/admin-exam.component';
import { ExamGestionsAdminComponent } from '../Components/Admin-Dashboard/gestions-admin/gestions-admin.component';
import { QuestionFormComponent } from '../Components/Admin-Dashboard/question-form/question-form.component';
import { AddGuestionFormComponent } from '../Components/Admin-Dashboard/add-guestion-form/add-guestion-form.component';
import { StudentResultsComponent } from '../Components/Admin-Dashboard/student-results/student-results.component';

export const routes: Routes = [
  { path: '', component: ForwardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'course-tracks/:id', component: AvilableTracksComponent },
  { path: 'exam/:id', component: ExamsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'result', component: ResultComponent },
  { path: 'adminExam', component:AdminExamComponent },
  { path: 'examForm/:id', component: ExamFormComponent },
  { path: 'questionForm/:id', component: QuestionFormComponent },
  { path: 'questionFormAdd/:id', component: AddGuestionFormComponent },
  { path: 'userResults', component: StudentResultsComponent },

  { path: 'examQuestionsAdmin/:id', component: ExamGestionsAdminComponent },


];
