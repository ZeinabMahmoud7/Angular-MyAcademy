import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
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

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getExamsByTrackId(courseId: number, trackId: number): Observable<any[]> {
    return this.getCourseById(courseId).pipe(
      map((course: any) => {
        const track = (course as any).tracks.find((t: any) => t.id === trackId);
        return track ? track.exams || [] : [];
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

  addExam(exam: Iexam, courseId: number, trackId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}`).pipe(
      map((course: any) => {
        const tracks = (course as any).tracks;
        const trackIndex = tracks.findIndex((track: any) => track.id === trackId);
        if (trackIndex === -1) throw new Error('Track not found');
        if (!tracks[trackIndex].exams) {
          tracks[trackIndex].exams = [];
        }
        tracks[trackIndex].exams.push(exam);
        return course;
      }),
      switchMap((updatedCourse: any) => {
        return this.http.put(`${this.apiUrl}/${courseId}`, updatedCourse);
      })
    );
  }

 deleteExam(courseId: number, trackId: number, examId: number): Observable<any> {
  return this.getCourseById(courseId).pipe(
    map((course: any) => {
      const tracks = course.tracks || [];
      const trackIndex = tracks.findIndex((t: any) => t.id === trackId);
      if (trackIndex === -1) throw new Error('Track not found');

      const exams = tracks[trackIndex].exams || [];
      tracks[trackIndex].exams = exams.filter((e: any) => e.id !== examId);
      return course;
    }),
    switchMap((updatedCourse: any) => {
      return this.http.put(`${this.apiUrl}/${courseId}`, updatedCourse);
    })
  );
}
}
