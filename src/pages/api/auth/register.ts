import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import db from '~/db/dbConnection'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    await db.connectDatabase()

    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing field!' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default handler
