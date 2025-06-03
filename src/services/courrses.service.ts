import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourrsesService {
  apiUrl="http://localhost:3000/courses"
  constructor(private http:HttpClient) {

  }
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
}
