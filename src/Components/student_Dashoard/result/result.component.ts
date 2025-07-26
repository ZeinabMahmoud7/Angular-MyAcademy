import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Iuser } from '../../Shared/module/iuser';
import { UserDataService } from '../../Shared/services/user-data.service';
import { ExamService } from '../../Shared/services/exam.service';

@Component({
  selector: 'app-result',
  imports: [RouterModule, RouterLink],
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: number = 0;
  data!: Iuser;
  examId!: string;
  examTitle!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userData: UserDataService,
    private examService: ExamService
  ) {}

 ngOnInit(): void {
  this.examId = this.route.snapshot.paramMap.get('id')!;
  const email = localStorage.getItem('email');
  this.score = this.userData.getScore();

  // أولاً نحصل على بيانات الامتحان
  this.examService.getQuestionByExamId(Number(this.examId)).subscribe({
    next: (examData) => {
      this.examTitle = examData.title;
      console.log('Exam Data:', examData);

      this.userData.getUserData().subscribe((users: Iuser[]) => {
        const foundUser = users.find(u => u.email === email);
         console.log(foundUser)
        if (foundUser) {
          this.data = foundUser;
          console.log('User Data:', this.data);

          if (!this.data.exams) this.data.exams = [];

          this.data.exams.push({
            examTitle: this.examTitle,
            score: this.score
          });

          console.log("examTitle", this.examTitle);
          console.log("score", this.score);

          this.userData.updateUserExams(this.data.id, this.data.exams).subscribe({
            next: () => console.log('✅ Exams updated in backend'),
            error: (err) => console.error('❌ Failed to update exams', err)
          });

        } else {
          console.warn('❗ User not found');
        }
      });
    },
    error: (err) => console.error('Failed to get exam data', err)
  });
}



  getMessage(): string {
    if (this.score >= 8) return 'Excellent! You nailed it!';
    if (this.score >= 5) return 'Good job! Keep practicing.';
    return 'Keep going! Review the material and try again.';
  }
}
