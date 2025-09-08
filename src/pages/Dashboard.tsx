import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Bell,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockStudents, mockTeachers, mockClasses, mockAnnouncements } from '@/lib/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description, trend }) => (
  <Card className="shadow-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {trend && (
        <div className="flex items-center mt-1">
          <TrendingUp className={`h-3 w-3 mr-1 ${trend.isPositive ? 'text-success' : 'text-destructive'}`} />
          <span className={`text-xs ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
            {trend.value}
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getStats = () => {
    if (user?.role === 'admin') {
      return [
        {
          title: 'Total Students',
          value: mockStudents.length,
          icon: GraduationCap,
          description: 'Active students enrolled',
          trend: { value: '+12% from last month', isPositive: true }
        },
        {
          title: 'Total Teachers',
          value: mockTeachers.length,
          icon: Users,
          description: 'Active teaching staff',
          trend: { value: '+2% from last month', isPositive: true }
        },
        {
          title: 'Active Classes',
          value: mockClasses.length,
          icon: BookOpen,
          description: 'Currently running classes',
          trend: { value: 'Stable', isPositive: true }
        },
        {
          title: 'Attendance Rate',
          value: '94.5%',
          icon: CheckCircle,
          description: 'Overall attendance this month',
          trend: { value: '+1.2% from last month', isPositive: true }
        }
      ];
    }
    
    if (user?.role === 'teacher') {
      return [
        {
          title: 'My Students',
          value: 25,
          icon: GraduationCap,
          description: 'Students in your classes'
        },
        {
          title: 'My Classes',
          value: 3,
          icon: BookOpen,
          description: 'Classes you teach'
        },
        {
          title: 'Pending Grades',
          value: 8,
          icon: Clock,
          description: 'Assignments to grade'
        },
        {
          title: 'Attendance Rate',
          value: '96.2%',
          icon: CheckCircle,
          description: 'Your classes average'
        }
      ];
    }
    
    // Student stats
    return [
      {
        title: 'My Classes',
        value: 6,
        icon: BookOpen,
        description: 'Enrolled classes'
      },
      {
        title: 'Attendance',
        value: '92%',
        icon: CheckCircle,
        description: 'Your attendance rate'
      },
      {
        title: 'Average Grade',
        value: 'B+',
        icon: TrendingUp,
        description: 'Overall performance'
      },
      {
        title: 'Assignments Due',
        value: 3,
        icon: Clock,
        description: 'Pending submissions'
      }
    ];
  };

  const stats = getStats();
  const recentAnnouncements = mockAnnouncements.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getWelcomeMessage()}, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening at your school today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Announcements */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Announcements</span>
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium">{announcement.title}</h4>
                    <Badge 
                      variant={announcement.type === 'urgent' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {announcement.author} • {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {user?.role === 'admin' && (
              <>
                <div className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-smooth">
                  <h4 className="text-sm font-medium">Add New Student</h4>
                  <p className="text-xs text-muted-foreground">Register a new student to the system</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-smooth">
                  <h4 className="text-sm font-medium">Create Class</h4>
                  <p className="text-xs text-muted-foreground">Set up a new class for the semester</p>
                </div>
              </>
            )}
            
            {user?.role === 'teacher' && (
              <>
                <div className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-smooth">
                  <h4 className="text-sm font-medium">Take Attendance</h4>
                  <p className="text-xs text-muted-foreground">Mark attendance for today's classes</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-smooth">
                  <h4 className="text-sm font-medium">Grade Assignments</h4>
                  <p className="text-xs text-muted-foreground">Review and grade pending assignments</p>
                </div>
              </>
            )}
            
            {user?.role === 'student' && (
              <>
                <div className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-smooth">
                  <h4 className="text-sm font-medium">View Schedule</h4>
                  <p className="text-xs text-muted-foreground">Check your class timetable</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50 hover:bg-accent cursor-pointer transition-smooth">
                  <h4 className="text-sm font-medium">Check Grades</h4>
                  <p className="text-xs text-muted-foreground">View your latest grades and feedback</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};