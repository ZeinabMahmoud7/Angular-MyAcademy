import { Component, OnInit } from '@angular/core';
import { CourrsesService } from '../../student_Dashoard/services/courrses.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-exam',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-exam.component.html',
  styleUrl: './admin-exam.component.css'
})
export class AdminExamComponent implements OnInit {
  exams: any[] = []
  courses: any[] = []
  Tracks: any[] = []
  courseId!:number;
  trackId!:number;
  constructor(private courseService: CourrsesService) { }
  ngOnInit(): void {
    /*this.courseService.getAllExams().subscribe({
      next: (data) => this.exams = data
    }
    )*/
    this.courseService.getAllCourses().subscribe(
      {
        next: (data) => {
          this.courses = data
        }
      }
    )
  }
  choosedCourseId(id: number) {
    this.courseId=id;
    this.courseService.getCourseById(id).subscribe(
      {
        next: (data: any) => {this.Tracks = data.tracks
          console.log(this.Tracks)
        }
      }
    )
  }
  choosedTrackId(id:number)
  {
    this.trackId=id;
this.courseService.getExamsByTrackId(this.courseId,this.trackId).subscribe({
  next:(data)=>this.exams=data
})
  }
}
