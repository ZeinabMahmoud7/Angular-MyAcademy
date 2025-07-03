import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Iuser } from '../../Shared/module/iuser';
import { UserDataService } from '../../Shared/services/user-data.service';

@Component({
  selector: 'app-result',
  imports: [RouterModule, RouterLink],
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: any;
  data!: Iuser;

  constructor(
    private userData: UserDataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userData.getUserData().subscribe((user: Iuser[]) => {
      this.data = user[user.length - 1];

      // لو أول مرة ياخد الامتحان، خزّن النتيجة
      if (this.data.score === "didn't take any exam") {
        this.data.score = this.userData.getScore();

        this.userData.updateUserData(this.data, this.data.id).subscribe({
          next: () => {
            console.log('Score saved to database');
            this.score = this.data.score;
          },
          error: (err:any) => console.error('Error saving score', err)
        });
      } else {
        this.score = this.data.score;
      }
    });
  }

  getMessage(): string {
    if (this.score >= 8) return ' Excellent! You nailed it!';
    if (this.score >= 5) return ' Good job! Keep practicing.';
    return ' Keep going! Review the material and try again.';
  }
}
