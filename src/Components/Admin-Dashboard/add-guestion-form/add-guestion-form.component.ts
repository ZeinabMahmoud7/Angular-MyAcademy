import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-guestion-form',
  imports: [CommonModule],
  templateUrl: './add-guestion-form.component.html',
  styleUrl: './add-guestion-form.component.css'
})
export class AddGuestionFormComponent implements OnInit {
  question: any
  examId: any
  trackId: any
  courseId: any
  questionId:any
  constructor(private activeRoute: ActivatedRoute,
            ) {}
  ngOnInit(): void {
    this.examId = this.activeRoute.snapshot.paramMap.get('id')
    this.courseId = this.activeRoute.snapshot.queryParamMap.get('courseId')
    this.questionId = this.activeRoute.snapshot.queryParamMap.get('questionId')
    this.trackId = this.activeRoute.snapshot.queryParamMap.get('trackId')



  }


}
