import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourrsesService } from '../../services/courrses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent implements OnInit {
  question: any
  examId: any
  trackId: any
  courseId: any
  questionId:any
  constructor(private activeRoute: ActivatedRoute,
              private courseService: CourrsesService,
              private route:Router) {}
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
  onSubmit() {
  this.courseService.editQuistion(
    Number(this.courseId),
    Number(this.trackId),
    Number(this.examId),
    Number(this.questionId),
    this.question
  ).subscribe({
    next: () => {
      alert('Edited Successfully');
      this.route.navigate(['/questionForm',this.questionId])
    },

  });
}

deleteOption(id:number)
{

}

}
