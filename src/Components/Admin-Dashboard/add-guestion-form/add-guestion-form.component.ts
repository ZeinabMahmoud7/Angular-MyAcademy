import { Component, OnInit } from '@angular/core';
import { CourrsesService } from '../../services/courrses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-guestion-form',
  imports: [],
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
              private courseService: CourrsesService) {}
  ngOnInit(): void {
    this.examId = this.activeRoute.snapshot.paramMap.get('id')
    this.courseId = this.activeRoute.snapshot.queryParamMap.get('courseId')
    this.questionId = this.activeRoute.snapshot.queryParamMap.get('questionId')
    this.trackId = this.activeRoute.snapshot.queryParamMap.get('trackId')

    this.courseService.getQuestionDetails(this.courseId,this.trackId,this.examId,this.questionId).subscribe({
       next:(data)=>{this.question=data
        console.log(this.question)
       }
    })

  }


}
