import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourrsesService } from '../../services/courrses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  examId!: number;
  trackId!: number;
  courseId!: number;
  questions: any[] = [];
  formQuestion: FormGroup = new FormGroup({});
  isLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private courseService: CourrsesService,private formData:FormService) { }

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
      this.formData.setFormData(this.formQuestion)
    }
  }
}
