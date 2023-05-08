import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { createResetToken } from '@/libs/utils'
import { sendEmail } from '@/libs/sendEmails'

import dbConnect from '@/database/dbConnect'
import User from '@/database/models/user'
import Token from '@/database/models/token'
import { resetEmailTemplate } from '@/libs/template/resetEmailTemplate'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    await dbConnect()
    const email = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: `Email không tồn tại!` })
    }

    const existingToken = await Token.findOne({ user: user._id })
    if (existingToken) {
      await existingToken.deleteOne()
    }
    const user_token_id = createResetToken({
      id: user._id.toString()
    })

    const newToken = new Token({
      userId: user._id,
      token: user_token_id,
      expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000) // expires in 6 hours
    })
    await newToken.save()

    const url = `${process.env.BASE_URL}/auth/reset-password/${user_token_id}`
    sendEmail('', email, url, 'Reset Password For Your Account', resetEmailTemplate, '')

    res.json({ message: 'Vui lòng kiểm tra Email của bạn!' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default handler
