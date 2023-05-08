export interface IProvider {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

export interface IBodyRegister {
  name: string
  email: string
  password: string
}

export interface IBodyReset {
  user_id: string
  password: string
}
