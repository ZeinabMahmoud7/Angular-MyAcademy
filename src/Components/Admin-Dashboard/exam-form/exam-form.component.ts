import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iexam } from '../../Shared/module/iexam';
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
    private router: Router,
    private routerLink: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.trackId = Number(this.routerLink.snapshot.queryParamMap.get('trackId'));
    this.courseId = Number(this.routerLink.snapshot.queryParamMap.get('courseId'));
    this.examId = Number(this.routerLink.snapshot.paramMap.get('id'));


  }

  onSubmit(): void {
    if (this.formData.valid) {
      const exam: Iexam = {
        ...(this.formData.value as Iexam),
        id: this.examId === 0 ? Date.now() : this.examId // generate ID for new exam
      };

      if (this.examId === 0) {

      } else {

      }
    }
  }
}
