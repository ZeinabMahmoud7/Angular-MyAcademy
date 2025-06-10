import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourrsesService } from '../../student_Dashoard/services/courrses.service';
import { Iexam } from '../../student_Dashoard/module/iexam';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  examData!: Iexam;
  trackId!: number;
  courseId!: number;

  constructor(
    private courseService: CourrsesService,
    private router: Router,
    private routerLink: ActivatedRoute,

  ) {}

  formData = new FormGroup({
    title: new FormControl('Untitled Exam', Validators.required),
    difficulty: new FormControl('medium'),
    Available: new FormControl(true),
    time: new FormControl(30),
    numberOfQuestions: new FormControl('10')
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.formData.valid) {
      const exam: Iexam = this.formData.value as unknown as Iexam;

      this.trackId = Number(this.routerLink.snapshot.queryParamMap.get('trackId'));
      this.courseId = Number(this.routerLink.snapshot.queryParamMap.get('courseId'));

      this.courseService.addExam(exam, this.courseId, this.trackId).subscribe({
        next: (data) => {
          this.examData = data;
          alert('✅ Exam added successfully!');
          this.formData.reset({
            title: 'Untitled Exam',
            difficulty: 'medium',
            Available: true,
            time: 30,
            numberOfQuestions: '10'
          });
          this.router.navigate(['/adminExam'])
        },
        error: () => alert('❌ Failed to add exam. Please try again.')
      });
    }
  }
}
