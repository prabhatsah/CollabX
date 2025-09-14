import { Role } from '@prisma/client';
import { MonitorCog, Eye, Crown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthRoute(path: string) {
  return path === '/login' || path === '/signup';
}

export function roleHelper(role: Role): {
  color: string;
  icon: string;
} {
  const roleStruc = {
    ADMIN1: {
      color: 'destructive',
      icon: <Crown />,
      value: 'ADMIN',
    },
    ADMIN: {
      color: 'warning',
      icon: <MonitorCog />,
      value: 'SUPPORT',
    },
    USER: {
      color: 'muted',
      icon: <Eye />,
      value: 'USER',
    },
  } as const;

  return roleStruc[role as keyof typeof roleStruc];
}

export const isAuthPage = () =>
  ['/login', '/signup', '/forgot-password'].includes(window.location.pathname);

// get falback for avatar, like JM for Jamie Maridona
export const getInitials = (fullName: string): string => {
  if (!fullName) return '';

  const parts = fullName.trim().split(/\s+/); // split by spaces
  if (parts.length === 1) {
    return parts[0][0].toUpperCase(); // single name → first letter
  }

  return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase(); // first + last
};
