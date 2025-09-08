import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Mail,
  Phone,
  Save
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1-555-0123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself..." />
            </div>
            <Button variant="gradient" className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Class Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified about upcoming classes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Grade Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications for new grades</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Announcements</Label>
                <p className="text-sm text-muted-foreground">School-wide announcements</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="w-full">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Preferences</span>
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select className="w-full p-2 border rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select className="w-full p-2 border rounded-md">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-6 (Central Time)</option>
                <option>UTC-7 (Mountain Time)</option>
                <option>UTC-8 (Pacific Time)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      {user?.role === 'admin' && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Management</span>
            </CardTitle>
            <CardDescription>Manage system data and backups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="w-full">
                Export Data
              </Button>
              <Button variant="outline" className="w-full">
                Create Backup
              </Button>
              <Button variant="destructive" className="w-full">
                Reset System
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Support */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Call Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};