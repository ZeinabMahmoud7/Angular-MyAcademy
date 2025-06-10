import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Iexam } from '../student_Dashoard/module/iexam';

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

getExamById(id: number): Observable<Iexam | undefined> {
  return this.getAllExams().pipe(
    map((exams: Iexam[]) => exams.find((exam) => exam.id === id))
  );
}

EditExam(courseId: number, trackId: number, examId: number, updatedExam: Iexam): Observable<any> {
  return this.getCourseById(courseId).pipe(
    map((course: any) => {
      const tracks = course.tracks || [];
      const track = tracks.find((t: any) => t.id === trackId);
      if (!track) throw new Error('Track not found');

      const examIndex = track.exams.findIndex((e: any) => e.id === examId);
      if (examIndex === -1) throw new Error('Exam not found');

      track.exams[examIndex] = { ...track.exams[examIndex], ...updatedExam };
      return course;
    }),
    switchMap((updatedCourse: any) => {
      return this.http.put(`${this.apiUrl}/${courseId}`, updatedCourse);
    })
  );
}

 getExamsByTrackId(courseId: number, trackId: number): Observable<any[]> {
    return this.getCourseById(courseId).pipe(
      map((course) => {
        const track = course.tracks.find((t: any) => t.id === trackId);
        return track ? track.exams || [] : [];
      })
    );
  }

getQuestionsByExamId(courseId: number, trackId: number, examId: number):Observable<any>
{
return this.getCourseById(courseId).pipe(
  map((course:any)=>{
    const tracks=course.tracks;
    const track=tracks.find((t:any)=>t.id=trackId)
    if(!track) throw new Error("track not found")

    const exams=track.exams
    const examIndex=exams.findIndex((e:any)=>e.id=examId)
    if(examIndex==-1) throw new Error("Exam not found")

    return exams[examIndex].questions
  })

)

}
}
