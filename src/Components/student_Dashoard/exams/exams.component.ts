import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourrsesService } from '../../services/courrses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  cnt = 0;
  examId!: number;
  trackId!: number;
  courseId!: number;
  questions: any[] = [];
  formQuestion: FormGroup = new FormGroup({});
  isLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private courseService: CourrsesService, private userData: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseId = Number(this.route.snapshot.queryParamMap.get('courseId'));
    this.trackId = Number(this.route.snapshot.queryParamMap.get('trackId'));

    this.courseService.getExamsByTrackId(this.trackId, this.courseId).subscribe({
      next: (exams) => {
        const exam = exams.find((e: any) => e.id == this.examId);
        if (exam) {
          this.questions = exam.questions;

          const group: { [key: string]: FormControl } = {}
          this.questions.forEach((_, index) => {
            group[`question_${index}`] = new FormControl('', Validators.required);
          });

          this.formQuestion = new FormGroup(group);
          this.isLoaded = true;
        }
      }
    });
  }

  onSubmit(): void {
  if (this.formQuestion.valid) {
    const answers = this.formQuestion.value;
    let correctCount = 0;

    this.questions.forEach((question, index) => {
      const userAnswer = answers[`question_${index}`];
      const correctAnswer = question.correctAnswer;
      if (userAnswer == correctAnswer) correctCount++;
    });

    this.userData.getUserData().subscribe(users => {
      const lastUser = users[users.length - 1];

      if (!lastUser || !lastUser.id) {
        console.error('No user found to update score.');
        return;
      }

      const updatedUser = { ...lastUser, score: correctCount };

      this.userData.updateUserData(updatedUser, updatedUser.id).subscribe({
        next: () => {
          console.log('Score updated successfully');
          this.router.navigate(['/result']);
        },
        error: err => console.error('Failed to update score:', err)
      });
    });
  }
}

}
