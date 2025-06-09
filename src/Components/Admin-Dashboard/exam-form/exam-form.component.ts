import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourrsesService } from '../../student_Dashoard/services/courrses.service';
import { Iexam } from '../../student_Dashoard/module/iexam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.css']
})
export class ExamFormComponent implements OnInit {
  examData!: Iexam;

  constructor(
    private courseService: CourrsesService,
    private router: Router
  ) {}

  formData = new FormGroup({
    title: new FormControl('Untitled Exam', Validators.required),
    difficulty: new FormControl('medium'),
    Availability: new FormControl(true),
    time: new FormControl(30),
    numOfGuestion: new FormControl('10')
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.formData.valid) {
      const exam: Iexam = this.formData.value as Iexam;

      this.courseService.addExam(exam,this).subscribe({
        next: (data) => {
          this.examData = data;
          alert(' Exam added successfully!');
          this.formData.reset({
            title: 'Untitled Exam',
            difficulty: 'medium',
            Availability: true,
            time: 30,
            numOfGuestion: '10'
          });

        },
      });
    }
  }
}
