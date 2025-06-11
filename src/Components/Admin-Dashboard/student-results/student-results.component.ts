import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Iuser } from '../../student_Dashoard/module/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
  studentData: Iuser[]=[]

  constructor(private userData: UserDataService) {}

  ngOnInit(): void {
    this.userData.getUserData().subscribe({
      next: (users: Iuser[]) => {
        this.studentData = users;
      },
      error: err => {
        console.error('Error fetching user data', err);
      }
    });
  }
}
