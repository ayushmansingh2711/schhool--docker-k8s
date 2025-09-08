import { Student, Teacher, Class, Grade, Attendance, Announcement } from '@/types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@school.edu',
    studentId: 'STU001',
    grade: '10',
    class: '10-A',
    dateOfBirth: '2008-05-15',
    phone: '+1-555-0123',
    address: '123 Oak Street, Springfield',
    parentName: 'John Johnson',
    parentPhone: '+1-555-0124',
    status: 'active'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@school.edu',
    studentId: 'STU002',
    grade: '10',
    class: '10-A',
    dateOfBirth: '2008-03-22',
    phone: '+1-555-0125',
    address: '456 Pine Avenue, Springfield',
    parentName: 'Sarah Smith',
    parentPhone: '+1-555-0126',
    status: 'active'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol.williams@school.edu',
    studentId: 'STU003',
    grade: '11',
    class: '11-B',
    dateOfBirth: '2007-08-10',
    phone: '+1-555-0127',
    address: '789 Elm Drive, Springfield',
    parentName: 'Michael Williams',
    parentPhone: '+1-555-0128',
    status: 'active'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@school.edu',
    studentId: 'STU004',
    grade: '9',
    class: '9-C',
    dateOfBirth: '2009-01-18',
    phone: '+1-555-0129',
    address: '321 Maple Road, Springfield',
    parentName: 'Lisa Brown',
    parentPhone: '+1-555-0130',
    status: 'active'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Emma Davis',
    email: 'emma.davis@school.edu',
    teacherId: 'TCH001',
    subject: 'Mathematics',
    phone: '+1-555-0201',
    address: '567 University Ave, Springfield',
    qualification: 'Ph.D. in Mathematics',
    experience: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. James Wilson',
    email: 'james.wilson@school.edu',
    teacherId: 'TCH002',
    subject: 'Physics',
    phone: '+1-555-0202',
    address: '890 College Street, Springfield',
    qualification: 'M.Sc. in Physics',
    experience: 8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Ms. Sarah Miller',
    email: 'sarah.miller@school.edu',
    teacherId: 'TCH003',
    subject: 'English Literature',
    phone: '+1-555-0203',
    address: '234 Academy Lane, Springfield',
    qualification: 'M.A. in English',
    experience: 6,
    status: 'active'
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    grade: '10',
    section: 'A',
    teacherId: '1',
    subject: 'Mathematics',
    room: 'Room 101',
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '10:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '10:00' },
      { day: 'Friday', startTime: '09:00', endTime: '10:00' }
    ],
    maxStudents: 30,
    currentStudents: 25
  },
  {
    id: '2',
    name: 'Physics Laboratory',
    grade: '11',
    section: 'B',
    teacherId: '2',
    subject: 'Physics',
    room: 'Lab 201',
    schedule: [
      { day: 'Tuesday', startTime: '10:00', endTime: '12:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '12:00' }
    ],
    maxStudents: 20,
    currentStudents: 18
  }
];

export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    subject: 'Mathematics',
    marks: 85,
    maxMarks: 100,
    examType: 'test',
    date: '2024-01-15',
    remarks: 'Excellent performance'
  },
  {
    id: '2',
    studentId: '2',
    classId: '1',
    subject: 'Mathematics',
    marks: 78,
    maxMarks: 100,
    examType: 'test',
    date: '2024-01-15',
    remarks: 'Good work'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    date: '2024-01-20',
    status: 'present'
  },
  {
    id: '2',
    studentId: '2',
    classId: '1',
    date: '2024-01-20',
    status: 'present'
  },
  {
    id: '3',
    studentId: '3',
    classId: '2',
    date: '2024-01-20',
    status: 'absent',
    remarks: 'Sick leave'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    content: 'Parent-teacher meetings will be held on January 25th, 2024. Please check your schedule and confirm attendance.',
    type: 'event',
    author: 'Principal Office',
    date: '2024-01-18',
    targetAudience: 'all'
  },
  {
    id: '2',
    title: 'School Holiday Notice',
    content: 'The school will remain closed on January 26th for Republic Day. Classes will resume on January 27th.',
    type: 'general',
    author: 'Administration',
    date: '2024-01-19',
    targetAudience: 'all'
  },
  {
    id: '3',
    title: 'Science Fair Registration',
    content: 'Registration for the annual science fair is now open. Students interested in participating should submit their proposals by February 1st.',
    type: 'event',
    author: 'Science Department',
    date: '2024-01-20',
    targetAudience: 'students'
  }
];