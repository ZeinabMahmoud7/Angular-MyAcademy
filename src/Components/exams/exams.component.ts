import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourrsesService } from '../../services/courrses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  examId!: number;
  trackId!: number;
  courseId!: number;
  questions: any[] = [];
  formQuestion: FormGroup = new FormGroup({}); // ✅ تهيئة مبدئية

  isLoaded: boolean = false; // ✅ لتأخير العرض حتى اكتمال التحميل

  constructor(private route: ActivatedRoute, private courseService: CourrsesService) {}

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseId = Number(this.route.snapshot.queryParamMap.get('courseId'));
    this.trackId = Number(this.route.snapshot.queryParamMap.get('trackId'));

    this.courseService.getExamsByTrackId(this.trackId, this.courseId).subscribe({
      next: (exams) => {
        const exam = exams.find((e: any) => e.id == this.examId);
        if (exam) {
          this.questions = exam.questions;

          const group: { [key: string]: FormControl } = {};
          this.questions.forEach((_, index) => {
            group[index.toString()] = new FormControl('', Validators.required);
          });

          this.formQuestion = new FormGroup(group);
          this.isLoaded = true; // ✅ السماح بعرض الصفحة الآن
        }
      }
    });
  }

  onSubmit(): void {
    if (this.formQuestion.valid) {
      console.log('Form submitted:', this.formQuestion.value);
      // ✅ إرسال الإجابات أو حساب النتيجة
    }
  }
}
