export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  grade: string;
  class: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  teacherId: string;
  subject: string;
  phone: string;
  address: string;
  qualification: string;
  experience: number;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  subject: string;
  room: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  maxStudents: number;
  currentStudents: number;
}

export interface Grade {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  marks: number;
  maxMarks: number;
  examType: 'quiz' | 'test' | 'assignment' | 'final';
  date: string;
  remarks?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'event';
  author: string;
  date: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
}