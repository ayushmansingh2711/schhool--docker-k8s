import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Eye, Phone, Mail, GraduationCap } from 'lucide-react';
import { mockTeachers } from '@/lib/mockData';
import { Teacher } from '@/types';

export const Teachers: React.FC = () => {
  const [teachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const subjects = [...new Set(teachers.map(t => t.subject))];

  const TeacherForm: React.FC = () => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter teacher's full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacherId">Teacher ID</Label>
          <Input id="teacherId" placeholder="e.g., TCH001" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="teacher@school.edu" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+1-555-0201" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="e.g., Mathematics" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="qualification">Qualification</Label>
          <Input id="qualification" placeholder="e.g., M.Sc. in Mathematics" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="experience">Experience (Years)</Label>
          <Input id="experience" type="number" placeholder="5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter full address" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage teaching staff and their information</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter teacher information to create a new record.
              </DialogDescription>
            </DialogHeader>
            <TeacherForm />
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="gradient">Add Teacher</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">Active teaching staff</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Taught</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Different subjects covered</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Experience</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(teachers.reduce((acc, t) => acc + t.experience, 0) / teachers.length)} yrs
            </div>
            <p className="text-xs text-muted-foreground">Average years of experience</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Filter Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Teaching Staff</CardTitle>
          <CardDescription>
            {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-accent-foreground text-sm font-medium">
                          {teacher.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{teacher.teacherId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{teacher.subject}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{teacher.qualification}</TableCell>
                  <TableCell>{teacher.experience} years</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Phone className="h-3 w-3" />
                      <span>{teacher.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};