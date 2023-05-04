import http, { IResponseAPI } from '~/libs/http'

import { IBodyRegister } from '~/types/auth.type'

const authApi = {
  RegisterAccount(body: IBodyRegister) {
    return http.post<IResponseAPI>('/auth/register', body)
  }
}

export default authApi
