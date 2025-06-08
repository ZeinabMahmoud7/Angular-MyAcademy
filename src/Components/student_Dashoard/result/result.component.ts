import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { CourrsesService } from '../services/courrses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: number = 0;

  constructor(
    private formService: FormService,
    private CourrseService: CourrsesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.score = this.formService.getScore();
  }

  getMessage(): string {
    if (this.score >= 8) return '🌟 Excellent! You nailed it!';
    if (this.score >= 5) return '👍 Good job! Keep practicing.';
    return '📚 Keep going! Review the material and try again.';
  }
}
