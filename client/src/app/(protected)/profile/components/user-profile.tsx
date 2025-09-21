'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Save, Star } from 'lucide-react';
import { useSession } from '@/context/session-context';
import { RoundSpinner } from '@/components/loading-style/round-spinner';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import { useLoading } from '@/context/LoadingContext';

interface Organization {
  id: string;
  name: string;
  role: string;
  isDefault: boolean;
}

export function UserProfile() {
  const { session, isLoading } = useSession();
  const { setLoading } = useLoading();

  const [profileImage, setProfileImage] = useState('abstract-profile.jpg');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
  });
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState();

  const orgs = session?.organizations.map((org) => ({
    id: org.id,
    name: org.name,
    role: org.role,
    isDefault: org.id === session.defaultOrg.id,
  }));

  console.log('Orgs:', orgs);

  useEffect(() => {
    setFormData({
      name: session?.userInfo.fullName || '',
      email: session?.userInfo.email || '',
      gender: '',
    });
    setOrganizations(orgs);
    setSelectedOrganization(session?.defaultOrg.id);
  }, [session, isLoading]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDefaultOrgChange = (orgId: string) => {
    console.log(organizations, selectedOrganization);
    setSelectedOrganization(orgId);
    setOrganizations((prev) =>
      prev.map((org) => ({ ...org, isDefault: org.id === orgId })),
    );
    setTimeout(() => {
      console.log(organizations, selectedOrganization);
    }, 6000);
  };

  const handleSetDefaultOrganization = async (orgId: string) => {
    setOrganizations((prev) =>
      prev.map((org) => ({ ...org, isDefault: org.id === orgId })),
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Updating default organization
      const res = await apiFetch(`/organizations/default-org`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({
          organizationId: selectedOrganization,
        }),
      });

      setLoading(false);
      toast.success('User profile updated');
    } catch (error) {
      toast.error('Default Organization updation failed', {
        description: error?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return;

  const defaultOrg = organizations?.find((org) => org.isDefault);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-balance">User Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and organization settings
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Photo Section */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={profileImage || '/placeholder.svg'}
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl">
                  {formData.name &&
                    formData.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details Section */}
        <Card className="md:col-span-2">
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  readOnly
                  className="bg-muted"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Management</CardTitle>
          <CardDescription>
            Manage your organization affiliations and set your default
            organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="org-select">Default Organization</Label>
            <Select
              value={selectedOrganization}
              // onValueChange={(e) => setSelectedOrganization(e.target.value)}
              onValueChange={(value) => handleDefaultOrgChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations?.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    <div className="flex items-center gap-2">
                      {org.name} [{org.role}]
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>All Organizations</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {organizations?.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="font-medium">{org.name}</span>
                  {org.isDefault && (
                    <Badge
                      variant="default"
                      className="flex items-center gap-1"
                    >
                      <Star className="w-3 h-3 fill-current" />
                      Default
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
