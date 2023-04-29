import clientPromise from './mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_ID
  const clientSecret = process.env.GOOGLE_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_SECRET')
  }

  return { clientId, clientSecret }
}

/* function getFacebookCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.FACEBOOK_ID
  const clientSecret = process.env.FACEBOOK_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error('Missing FACEBOOK_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing FACEBOOK_SECRET')
  }

  return { clientId, clientSecret }
} */

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    })
  ]
}
