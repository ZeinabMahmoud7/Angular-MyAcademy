import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iexam } from '../module/iexam';

@Injectable({
  providedIn: 'root'
})
export class CourrsesService {
  apiUrl = "http://localhost:3000/courses";

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCourseById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getExamsByTrackId(courseId: number, trackId: number): Observable<any[]> {
    return this.getCourseById(courseId).pipe(
      map((course: any) => {
        const track = course.tracks.find((t: any) => t.id === trackId);
        return track ? track.exams : [];
      })
    );
  }

  getAllExams(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((courses: any[]) => {
        const allTracks = courses.flatMap(course => course.tracks || []);
        const allExams = allTracks.flatMap(track => track.exams || []);
        return allExams;
      })
    );
  }
  addExam(exam:Iexam,trackId:number,courseId:number):Observable<Iexam>
  {
    return this.http.post<Iexam>(`${this.apiUrl}/courses/${courseId}/tracks/${courseId}`,exam);
  }
}
