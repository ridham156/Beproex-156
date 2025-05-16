import { User } from '@auth0/nextjs-auth0/client'

declare module '@auth0/nextjs-auth0/client' {
  interface User {
    email?: string
    email_verified?: boolean
    name?: string
    nickname?: string
    picture?: string
    sub?: string
    updated_at?: string
    created_at?: string
    last_login?: string
    logins_count?: number
    'https://example.com/login_count'?: number
    'https://example.com/user_metadata'?: {
      isNewUser?: boolean
      lastLogin?: string
      registrationDate?: string
    }
  }
}
