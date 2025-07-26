import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../Shared/services/exam.service';
import { Iexam } from '../../Shared/module/iexam';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-exams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-exams.component.html',
  styleUrl: './all-exams.component.css'
})
export class AllExamsComponent implements OnInit {
  exams: Iexam[] = []
  totalQuestions: number = 0;
  totalTime: number = 0;

  constructor(private examService: ExamService) { }
  ngOnInit(): void {
    this.examService.getAllExams().subscribe(
      {
        next: (e: Iexam[]) => { this.exams = e,
          console.log(e)
        }
      }
    )
  }

}
