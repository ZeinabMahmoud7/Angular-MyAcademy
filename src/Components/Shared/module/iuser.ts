export interface Iuser {
  id?: any;
  exams?: [{
    examTitle: string;
    score: number;
  }];
  name: string;
  password: string
  email: string;
  courseName?: string;
  studentId: number;
}
