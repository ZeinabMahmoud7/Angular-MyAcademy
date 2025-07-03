import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../Shared/services/exam.service';
import { ActivatedRoute } from '@angular/router';
import { Iexam } from '../../Shared/module/iexam';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})

export class ExamComponent implements OnInit {
  examId!: number;
  examDetails!: Iexam;
  formQuestion!: FormGroup;
  currentQuestionIndex: number = 0;

  timeLeft: number = 0;
  intervalId: any;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.examService.getQuestionByExamId(this.examId).subscribe({
      next: (data) => {
        this.examDetails = data;
        this.createForm();

        this.timeLeft = (this.examDetails.time || 10) * 60;
        this.startTimer();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createForm() {
    const group: { [key: string]: FormControl } = {};
    this.examDetails.questions.forEach((_: any, index: number) => {
      group['question_' + index] = new FormControl('', Validators.required);
    });
    this.formQuestion = new FormGroup(group);
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId);
        alert("⏰ Time's up! Auto-submitting your exam.");
        this.onSubmit();
      }
    }, 1000);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.examDetails.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onSubmit() {
    clearInterval(this.intervalId);
    if (this.formQuestion.valid) {
      console.log('Submitted:', this.formQuestion.value);
      alert('Exam submitted successfully!');
    } else {
      alert('Please answer all questions.');
      this.formQuestion.markAllAsTouched();
    }
  }
}
