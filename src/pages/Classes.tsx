import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Plus, Users, Clock, MapPin, Calendar } from 'lucide-react';
import { mockClasses, mockTeachers } from '@/lib/mockData';
import { Class } from '@/types';

export const Classes: React.FC = () => {
  const [classes] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.grade.includes(searchTerm)
  );

  const getTeacherName = (teacherId: string) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown';
  };

  const ClassForm: React.FC = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="className">Class Name</Label>
          <Input id="className" placeholder="e.g., Advanced Mathematics" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="e.g., Mathematics" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">Grade 9</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="section">Section</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Section A</SelectItem>
              <SelectItem value="B">Section B</SelectItem>
              <SelectItem value="C">Section C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="room">Room</Label>
          <Input id="room" placeholder="e.g., Room 101" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacher">Teacher</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select teacher" />
            </SelectTrigger>
            <SelectContent>
              {mockTeachers.map(teacher => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name} - {teacher.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxStudents">Max Students</Label>
          <Input id="maxStudents" type="number" placeholder="30" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Schedule</Label>
        <div className="grid grid-cols-3 gap-2 p-4 border rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="day1">Day</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Monday" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" type="time" defaultValue="09:00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" defaultValue="10:00" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">Manage class schedules and assignments</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
              <DialogDescription>
                Set up a new class with schedule and teacher assignment.
              </DialogDescription>
            </DialogHeader>
            <ClassForm />
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="gradient">Create Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((total, cls) => total + cls.currentStudents, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((classes.reduce((total, cls) => total + cls.currentStudents, 0) / 
                classes.reduce((total, cls) => total + cls.maxStudents, 0)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall utilization</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Spots</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((total, cls) => total + (cls.maxStudents - cls.currentStudents), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Vacant seats</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Filter Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by class name, subject, or grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{cls.name}</CardTitle>
                <Badge variant="outline">
                  Grade {cls.grade}-{cls.section}
                </Badge>
              </div>
              <CardDescription>{cls.subject}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Teacher: {getTeacherName(cls.teacherId)}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{cls.room}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{cls.currentStudents}/{cls.maxStudents} students</span>
                </div>
                <div className="w-16 bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(cls.currentStudents / cls.maxStudents) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Schedule:</span>
                </div>
                <div className="space-y-1">
                  {cls.schedule.map((schedule, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground pl-6">
                      <Clock className="h-3 w-3" />
                      <span>{schedule.day}: {schedule.startTime} - {schedule.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};