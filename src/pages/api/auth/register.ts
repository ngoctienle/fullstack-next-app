import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import db from '~/db/dbConnection'
import User from '~/db/models/user'

import { createActivationToken } from '~/libs/jwt'
import { sendEmail } from '~/libs/sendEmails'
import { validateEmail } from '~/libs/validation'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    await db.connectDatabase()

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing field!' })
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email!' })
    }

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'Địa chỉ Email đã tồn tại!' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const cryptedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ name, email, password: cryptedPassword })
    const addedUser = await newUser.save()

    const activation_token = createActivationToken({
      id: addedUser._id.toString()
    })
    const url = `${process.env.BASE_URL}/activate/${activation_token}`
    sendEmail(name, email, url, 'Activate Your Account', '')

    await db.disconnectDatabase()
    res.json({ message: 'Đăng kí thành công! Vui lòng kiểm tra Email và kích hoạt tài khoản!' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default handler
