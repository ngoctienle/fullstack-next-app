import clientPromise from './mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import db from '~/db/dbConnection'
import User from '~/db/models/user'

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

function getFacebookCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.FACEBOOK_ID
  const clientSecret = process.env.FACEBOOK_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error('Missing FACEBOOK_ID')
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing FACEBOOK_SECRET')
  }

  return { clientId, clientSecret }
}
db.connectDatabase()

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub)

      session.user.id = token.sub || user?._id.toString()
      session.user.role = user?.role || 'user'

      return session
    }
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret
    }),
    FacebookProvider({
      clientId: getFacebookCredentials().clientId,
      clientSecret: getFacebookCredentials().clientSecret
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        const user = await User.findOne({
          email: credentials?.email
        })

        if (!user) {
          throw new Error('Địa chỉ Email không tồn tại!')
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const isPasswordMatch = await compare(credentials!.password, user.password)
        if (!isPasswordMatch) {
          throw new Error('Địa chỉ Email hoặc Mật khẩu không đúng!')
        }

        return user
      }
    })
  ]
}
