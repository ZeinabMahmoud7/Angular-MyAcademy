import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/Shared/login/login.component';
import { ProfileComponent } from '../Components/student_Dashoard/profile/profile.component';
import { ResultComponent } from '../Components/student_Dashoard/result/result.component';
import { ForwardComponent } from '../Components/student_Dashoard/forward/forward.component';
import { SignUpComponent } from '../Components/Shared/signup/signup.component';
import { ExamFormComponent } from '../Components/Admin-Dashboard/exam-form/exam-form.component';
import { ExamGestionsAdminComponent } from '../Components/Admin-Dashboard/gestions-admin/gestions-admin.component';
import { QuestionFormComponent } from '../Components/Admin-Dashboard/question-form/question-form.component';
import { StudentResultsComponent } from '../Components/Admin-Dashboard/student-results/student-results.component';
import { AllExamsComponent } from '../Components/student_Dashoard/all-exams/all-exams.component';
import { ExamComponent } from '../Components/student_Dashoard/exam/exam.component';

export const routes: Routes = [
  { path: '', component: ForwardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'allExams', component: AllExamsComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'result', component: ResultComponent },
  { path: 'examForm/:id', component: ExamFormComponent },
  { path: 'questionForm/:id', component: QuestionFormComponent },
  { path: 'userResults', component: StudentResultsComponent },

  { path: 'examQuestionsAdmin/:id', component: ExamGestionsAdminComponent },


];
