import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iexam } from '../module/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl='http://localhost:3000/exams'
  constructor(private http:HttpClient) { }
  getAllExams():Observable<Iexam[]>
  {
    return this.http.get<Iexam[]>(this.apiUrl)
  }
 getQuestionByExamId(examId:number):Observable<any>
 {
return this.http.get(`${this.apiUrl}/${examId}`)
 }

}
