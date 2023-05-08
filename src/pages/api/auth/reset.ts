import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import bcrypt from 'bcrypt'

import dbConnect from '@/database/dbConnect'
import User from '@/database/models/user'
import Token from '@/database/models/token'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    await dbConnect()
    const { user_id, password } = req.body

    const user = await User.findById(user_id)
    if (!user) {
      return res.status(400).json({ message: 'Token không hợp lệ!' })
    }
    const token = await Token.findOne({ userId: user._id })
    if (!token) {
      return res.status(400).json({ message: 'Token không tồn tại!' })
    }

    const cryptedPassword = await bcrypt.hash(password, 12)
    await user.updateOne({
      password: cryptedPassword
    })
    await token.deleteOne()

    res.json({ message: 'Đổi mật khẩu thành công!' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default handler
