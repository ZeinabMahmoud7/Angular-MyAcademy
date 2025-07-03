import { Component, OnInit } from '@angular/core';
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
  courseId!: number;
  trackId!: number;
  constructor() { }

  ngOnInit(): void {
    
  }







}
