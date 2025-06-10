import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourrsesService } from '../../services/courrses.service';
import { Iexam } from '../../student_Dashoard/module/iexam';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  examData!: Iexam;
  trackId!: number;
  courseId!: number;
  examId!: number;

  formData = new FormGroup({
    title: new FormControl('', Validators.required),
    difficulty: new FormControl('', Validators.required),
    Available: new FormControl(true, Validators.required),
    time: new FormControl(30, Validators.required),
    numberOfQuestions: new FormControl(10, Validators.required)
  });

  constructor(
    private courseService: CourrsesService,
    private router: Router,
    private routerLink: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.trackId = Number(this.routerLink.snapshot.queryParamMap.get('trackId'));
    this.courseId = Number(this.routerLink.snapshot.queryParamMap.get('courseId'));
    this.examId = Number(this.routerLink.snapshot.paramMap.get('id'));

    if (this.examId !== 0) {
      this.courseService.getExamById(this.examId).subscribe({
        next: (exam) => {
          if (exam) {
            this.examData = exam;
            this.formData.patchValue(exam);
          } else {
            alert('Exam not found');
          }
        },
        error: () => alert('Failed to load exam for editing')
      });
    }
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const exam: Iexam = {
        ...(this.formData.value as Iexam),
        id: this.examId === 0 ? Date.now() : this.examId // generate ID for new exam
      };

      if (this.examId === 0) {
        this.courseService.addExam(exam, this.courseId, this.trackId).subscribe({
          next: () => {
            alert('Exam added successfully!');
            this.router.navigate(['/adminExam']);
          },
          error: () => alert('Failed to add exam.')
        });
      } else {
        this.courseService.EditExam(this.courseId, this.trackId, this.examId, exam).subscribe({
          next: () => {
            alert('Exam updated successfully!');
                      },
          error: () => alert('Failed to update exam.')
        });
      }
    }
  }
}
