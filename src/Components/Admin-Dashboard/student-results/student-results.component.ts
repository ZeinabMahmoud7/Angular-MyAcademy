import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Iuser } from '../../student_Dashoard/module/iuser';

@Component({
  selector: 'app-student-results',
  imports: [],
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.css'
})
export class StudentResultsComponent implements OnInit {
  studentData:Iuser | undefined
  constructor(private userData:UserDataService)
  {

  }
  ngOnInit(): void {
this.userData.getUserData().subscribe({
  next:(data)=>{this.studentData=data
    console.log(this.studentData)
  }

})
}

}
