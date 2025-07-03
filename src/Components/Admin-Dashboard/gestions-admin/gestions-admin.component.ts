import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-gestions-admin',
  imports: [CommonModule,RouterLink],
  templateUrl: './gestions-admin.component.html',
  styleUrl: './gestions-admin.component.css'
})
export class ExamGestionsAdminComponent implements OnInit{
  questions:any[]=[]
  examId:any
  trackId:any
  courseId:any
constructor(private activeRoute:ActivatedRoute)
{

}
  ngOnInit(): void {
    this.examId=this.activeRoute.snapshot.paramMap.get('id')
    this.courseId=this.activeRoute.snapshot.queryParamMap.get('courseId')
    this.trackId=this.activeRoute.snapshot.queryParamMap.get('trackId')


  }
  deleteQuestion(questionId: number) {

}

}
