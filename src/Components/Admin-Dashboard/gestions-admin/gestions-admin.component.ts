import { Component, OnInit } from '@angular/core';
import { CourrsesService } from '../../services/courrses.service';
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
constructor(private courseCervice:CourrsesService,private activeRoute:ActivatedRoute)
{

}
  ngOnInit(): void {
    this.examId=this.activeRoute.snapshot.paramMap.get('id')
    this.courseId=this.activeRoute.snapshot.queryParamMap.get('courseId')
    this.trackId=this.activeRoute.snapshot.queryParamMap.get('trackId')


    this.courseCervice.getQuestionsByExamId(this.courseId,this.trackId,this.examId).subscribe(
    {
      next:(data)=>{this.questions=data},
      error:(err)=>{console.log(err)}
    }
    )
  }
  deleteQuestion(questionId: number) {
  if (confirm('Do You really want to delete question')) {
    this.courseCervice.deleteQuestion(this.courseId, this.trackId, this.examId, questionId).subscribe({
      next: () => {
        this.questions = this.questions.filter(q => q.id !== questionId);
        console.log('Deleted Successfully');
      },

    });
  }
}

}
