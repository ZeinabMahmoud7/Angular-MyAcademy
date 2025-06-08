import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private answers: string[] = [];

  setFormData(answer: string) {
    this.answers.push(answer);
  }

  getFormData() {
    return this.answers;
  }
}
