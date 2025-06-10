import { Component, OnInit } from '@angular/core';
import { CourrsesService } from '../../services/courrses.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-gestions-admin',
  imports: [CommonModule,RouterLink],
  templateUrl: './exam-gestions-admin.component.html',
  styleUrl: './exam-gestions-admin.component.css'
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
      next:(data)=>{this.questions=data
        console.log(this.questions)
      },
      error:(err)=>{console.log(err)}
    }
    )
  }
  deleteQuestion(id:number)
  {

  }
}
