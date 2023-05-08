import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import nc from 'next-connect'

import { validateEmail } from '@/libs/validators'
import { createActivationToken } from '@/libs/utils'
import { sendEmail } from '@/libs/sendEmails'

import dbConnect from '@/database/dbConnect'
import User from '@/database/models/user'
import { activateEmailTemplate } from '@/libs/template/activateEmailTemplate'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    await dbConnect()

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
    sendEmail(name, email, url, 'Activate Your Account', activateEmailTemplate, '')

    res.json({ message: 'Đăng kí thành công! Vui lòng kiểm tra Email và kích hoạt tài khoản!' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default handler
