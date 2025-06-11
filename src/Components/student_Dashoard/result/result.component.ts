import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { CourrsesService } from '../../services/courrses.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { Iuser } from '../module/iuser';

@Component({
  selector: 'app-result',
  imports: [RouterModule, RouterLink],
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: number = 0;
  data!: Iuser;
  constructor(
    private userData: UserDataService,
    private route: Router
  ) { }

ngOnInit(): void {
  this.score = this.userData.getScore();

  this.userData.getUserData().subscribe((user: Iuser) => {
    this.data = user;
    this.data.score = this.score;

    this.userData.updateUserData(this.data).subscribe({
      next: () => console.log('Score saved to database'),
      error: err => console.error('Error saving score', err)
    });
  });
}



  getMessage(): string {
    if (this.score >= 8) return ' Excellent! You nailed it!';
    if (this.score >= 5) return ' Good job! Keep practicing.';
    return ' Keep going! Review the material and try again.';
  }
}
