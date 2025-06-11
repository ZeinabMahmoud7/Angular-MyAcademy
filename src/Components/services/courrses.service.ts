import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Iexam } from '../student_Dashoard/module/iexam';
import { IQuestion } from '../student_Dashoard/module/i-question';

@Injectable({
  providedIn: 'root'
})
export class CourrsesService {
  apiUrl = "http://localhost:3000/courses";

  constructor(private http: HttpClient) { }

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

  getExamsByTrackId(
    courseId: number,
    trackId: number): Observable<any[]> {
    return this.getCourseById(courseId).pipe(
      map((course) => {
        const track = course.tracks.find((t: any) => t.id === trackId);
        return track ? track.exams || [] : [];
      })
    );
  }

  getQuestionsByExamId(
    courseId: number,
    trackId: number,
    examId: number): Observable<any> {
    return this.getCourseById(courseId).pipe(
      map((course: any) => {
        const tracks = course.tracks;
        const track = tracks.find((t: any) => t.id == trackId)
        if (!track) throw new Error("track not found")

        const exams = track.exams
        const examIndex = exams.findIndex((e: any) => e.id == examId)
        if (examIndex == -1) throw new Error("Exam not found")

        return exams[examIndex].questions
      })

    )

  }

  getQuestionDetails(courseId: number,trackId: number,examId: number,questionId: number): Observable<any> {
    return this.getQuestionsByExamId(courseId, trackId, examId).pipe(
      map((questions) => {
        const question = questions.find((q: any) => q.id == questionId)
        return question
      }
      )
    )
  }

addQuestion(courseId: number,trackId: number,examId: number,newQuestion: IQuestion): Observable<any> {
  return this.getCourseById(courseId).pipe(
    map((course: any) => {
      const track = course.tracks?.find((t: any) => t.id === trackId);
      if (!track) throw new Error('Track not found');

      const exam = track.exams?.find((e: any) => e.id === examId);
      if (!exam) throw new Error('Exam not found');

      if (!exam.questions) exam.questions = [];

      const maxId = Math.max(0, ...exam.questions.map((q: any) => q.id || 0));
      newQuestion.id = maxId + 1;

      exam.questions.push(newQuestion);
      return course;
    }),
    switchMap((updatedCourse: any) => {
      return this.http.put(`${this.apiUrl}/${courseId}`, updatedCourse);
    })
  );
}

  editQuistion(trackId: number,courseId: number,examId: number,questionId: number,updatedQuestion: IQuestion): Observable<any> {
    return this.getCourseById(courseId).pipe(
      map((course: any) => {
        console.log('Course:', course);

        const track = course.tracks?.find((t: any) => t.id === trackId);
        if (!track) throw new Error('Track not found');

        const exam = track.exams?.find((e: any) => e.id === examId);
        if (!exam) throw new Error('Exam not found');

        const questionIndex = exam.questions?.findIndex((q: any) => q.id === questionId);
        if (questionIndex === -1 || questionIndex === undefined) {
          throw new Error('Question not found');
        }
        exam.questions[questionIndex] = { ...exam.questions[questionIndex], ...updatedQuestion };
        return course;
      }),
      switchMap((updatedCourse: any) => {
        return this.http.put(`${this.apiUrl}/${courseId}`, updatedCourse);
      })
    );
  }
deleteQuestion(courseId: number,trackId: number,examId: number,questionId: number): Observable<any> {
  return this.getCourseById(courseId).pipe(
    map((course: any) => {
      const track = course.tracks?.find((t: any) => t.id === trackId);
      if (!track) throw new Error('Track not found');

      const exam = track.exams?.find((e: any) => e.id === examId);
      if (!exam) throw new Error('Exam not found');

      if (!exam.questions) throw new Error('Questions not found');

      exam.questions = exam.questions.filter((q: any) => q.id !== questionId);

      return course;
    }),
    switchMap((updatedCourse: any) => {
      return this.http.put(`${this.apiUrl}/${courseId}`, updatedCourse);
    })
  );
}
}
