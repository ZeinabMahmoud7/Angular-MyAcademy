import { Component, OnInit } from '@angular/core';
import { CourrsesService } from '../../student_Dashoard/services/courrses.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-exam',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-exam.component.html',
  styleUrl: './admin-exam.component.css'
})
export class AdminExamComponent implements OnInit {
  exams:any[]=[]
constructor(private courseService:CourrsesService){}
  ngOnInit(): void {
this.courseService.getAllExams().subscribe({
 next:(data)=>{this.exams=data
 console.log(this.exams)}
}
)
  }
}
