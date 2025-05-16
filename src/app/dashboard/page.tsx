'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  isNewUser, 
  getUserRole, 
  getWelcomeMessage, 
  getUserJoinDate,
  type UserMetadata 
} from '@/utils/user';

export default function Dashboard() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/api/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-600">An error occurred: {error.message}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userIsNew = isNewUser(user);
  const joinDate = getUserJoinDate(user);
  const welcomeMsg = getWelcomeMessage(user);
  const metadata = user['https://example.com/user_metadata'] as UserMetadata;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {userIsNew ? (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">{welcomeMsg}</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Let's help you get started:</p>
                  <ul className="list-disc ml-5 mt-2">
                    <li>Complete your profile information</li>
                    <li>Set your preferences in the settings</li>
                    <li>Explore available features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{welcomeMsg}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Continue where you left off.
            </p>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full"
                src={user.picture || ""}
                alt={user.name || ""}
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
              <dl className="mt-2 border-t border-gray-200">
                <div className="py-3 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                  <dd className="text-sm text-gray-900">{joinDate}</dd>
                </div>
                <div className="py-3 flex justify-between border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">
                    Email Verified
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {user.email_verified ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="py-3 flex justify-between border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Theme</dt>
                  <dd className="text-sm text-gray-900">
                    {metadata?.preferences?.theme === 'dark' ? 'Dark' : 'Light'}
                  </dd>
                </div>
                <div className="py-3 flex justify-between border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">
                    Account Status
                  </dt>
                  <dd className={`text-sm px-2 py-1 rounded ${
                    userIsNew
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {userIsNew ? "New Member" : "Returning Member"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
