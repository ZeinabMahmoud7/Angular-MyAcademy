import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../student_Dashoard/module/iuser';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  apiUrl = "http://localhost:3000/user"
  constructor(private http: HttpClient) {
  }
  setUserData(data: Iuser): Observable<Iuser> {
    return this.http.post<Iuser>(this.apiUrl, data)
  }
  getUserData(): Observable<Iuser> {
    return this.http.get<Iuser>(this.apiUrl)
  }
  private score: number = 0;

  setScore(score: number) {
   return this.score = score;
  }

  getScore(): number {
    return this.score;
  }
  updateUserData(user: Iuser): Observable<Iuser> {
  return this.http.put<Iuser>(`http://localhost:3000/users/${user.studentId}`, user);
}

}
