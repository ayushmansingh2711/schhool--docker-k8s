import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  ClipboardList, 
  CalendarDays,
  FileText,
  Settings,
  LogOut,
  School
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: ('admin' | 'teacher' | 'student')[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'teacher', 'student']
  },
  {
    title: 'Students',
    href: '/students',
    icon: GraduationCap,
    roles: ['admin', 'teacher']
  },
  {
    title: 'Teachers',
    href: '/teachers',
    icon: Users,
    roles: ['admin']
  },
  {
    title: 'Classes',
    href: '/classes',
    icon: BookOpen,
    roles: ['admin', 'teacher']
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: ClipboardList,
    roles: ['admin', 'teacher']
  },
  {
    title: 'Grades',
    href: '/grades',
    icon: FileText,
    roles: ['admin', 'teacher', 'student']
  },
  {
    title: 'Schedule',
    href: '/schedule',
    icon: CalendarDays,
    roles: ['admin', 'teacher', 'student']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin', 'teacher', 'student']
  }
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary rounded-lg">
            <School className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">School MS</h2>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium">
              {user?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-muted-foreground hover:text-accent-foreground"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};