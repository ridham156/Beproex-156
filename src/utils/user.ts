import { UserProfile } from '@auth0/nextjs-auth0/client';

export interface UserMetadata {
  isNewUser?: boolean;
  onboardingCompleted?: boolean;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

export function isNewUser(user: UserProfile | undefined | null): boolean {
  if (!user) return false;
  
  // Check user metadata first
  const metadata = user['https://example.com/user_metadata'] as UserMetadata;
  if (metadata?.isNewUser) return true;

  // Check login count
  const loginCount = user.logins_count || user['https://example.com/login_count'];
  if (loginCount === 1) return true;

  // Check creation date (within last 24 hours)
  const createdAt = new Date((user.created_at || user.updated_at || Date.now()) as string | number);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  return createdAt > oneDayAgo;
}

export function getUserRole(user: UserProfile | undefined | null): 'new' | 'existing' | 'none' {
  if (!user) return 'none';
  return isNewUser(user) ? 'new' : 'existing';
}

export function getWelcomeMessage(user: UserProfile | undefined | null): string {
  const role = getUserRole(user);
  if (role === 'new') {
    return "Welcome to BeproEx! We're excited to have you join us.";
  }
  return `Welcome back, ${user?.name || 'there'}!`;
}

export function getUserJoinDate(user: UserProfile | undefined | null): string {
  if (!user) return '';
  
  const date = new Date((user.created_at || user.updated_at || Date.now()) as string | number);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function getLastLoginDate(user: UserProfile | undefined | null): string {
  if (!user) return '';
  
  const date = new Date((user.last_login || user.updated_at || Date.now()) as string | number);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function hasCompletedOnboarding(user: UserProfile | undefined | null): boolean {
  if (!user) return false;
  const metadata = user['https://example.com/user_metadata'] as UserMetadata;
  return metadata?.onboardingCompleted || false;
}

export function getUserPreferences(user: UserProfile | undefined | null): UserMetadata['preferences'] {
  if (!user) return {};
  const metadata = user['https://example.com/user_metadata'] as UserMetadata;
  return metadata?.preferences || {};
}
