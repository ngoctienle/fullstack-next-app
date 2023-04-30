import clientPromise from './mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
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

function getOAuthCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.AUTH0_CLIENT_ID
  const clientSecret = process.env.AUTH0_CLIENT_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error('Missing AUTH0_CLIENT_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing AUTH0_CLIENT_SECRET')
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt'
  },
  /* pages: {
    signIn: '/login'
  }, */
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    }),
    Auth0Provider({
      clientId: getOAuthCredentials().clientId,
      clientSecret: getOAuthCredentials().clientSecret,
      issuer: process.env.AUTH0_ISSUER
    })
  ]
}
