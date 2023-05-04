/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  type User = IUserModel
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      role: string
    }
  }
}
