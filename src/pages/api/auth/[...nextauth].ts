import NextAuth from 'next-auth'

import { authOptions } from '@/libs/auth'

/** @see @/lib/auth*/
export default NextAuth(authOptions)
