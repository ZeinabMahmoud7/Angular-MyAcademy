import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private score: number = 0;

  setScore(score: number) {
    this.score = score;
  }

  getScore(): number {
    return this.score;
  }
}
