import { google } from 'googleapis'
import nodemailer from 'nodemailer'

import { activateEmailTemplate } from './template/activateEmailTemplate'

const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
)

export const sendEmail = async (
  name: string,
  to: string,
  url: string,
  subject: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  txt?: string
): Promise<void> => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
  })
  const { token } = await oauth2Client.getAccessToken()
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken: token as string
    }
  })

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: activateEmailTemplate(name, url)
  }
  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err
    return infos
  })
}
