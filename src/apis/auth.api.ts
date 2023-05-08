import http, { IResponseAPI } from '@/libs/http'

import { IBodyRegister, IBodyReset } from '@/types/auth.type'

const authApi = {
  RegisterAccount(body: IBodyRegister) {
    return http.post<IResponseAPI>('/auth/register', body)
  },
  ForgotPassword(email: string) {
    return http.post('/auth/forgot', email)
  },
  ResetPassword(body: IBodyReset) {
    return http.post<IResponseAPI>('/auth/reset', body)
  }
}

export default authApi
