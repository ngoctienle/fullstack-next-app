/* import type { RegisterOptions } from 'react-hook-form' */
import * as yup from 'yup'

/* type Rules = {
  [key in 'email' | 'password' | 'confirm_password' | 'fullname']?: RegisterOptions
} */

const handleConfirmPw = (refString: string) => {
  return yup
    .string()
    .required('Vui lòng nhập lại mật khẩu!')
    .min(6, 'Mật khẩu ít nhất 6 ký tự!')
    .max(100, 'Mật khẩu quá dài!')
    .oneOf([yup.ref(refString)], 'Mật khẩu không trùng khớp!')
}

export const formSchema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập địa chỉ Email!')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Địa chỉ Email không đúng định dạng!'
    )
    .min(5, 'Địa chỉ Email quá ngắn!')
    .max(160, 'Địa chỉ Email quá dài!'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu!')
    .min(6, 'Mật khẩu ít nhất 6 ký tự!')
    .max(100, 'Mật khẩu quá dài!'),
  confirm_pw: handleConfirmPw('password'),
  fullname: yup
    .string()
    .required('Vui lòng nhập Họ và tên của bạn!')
    .min(2, 'Độ dài không hợp lệ!')
    .matches(
      /^[^\d`~!@#$%^&*()+=|\\\[\]{};':"<>?,./_]+(\s+[^\d`~!@#$%^&*()+=|\\\[\]{};':"<>?,./_]+){1,}$/u,
      'Vui lòng nhập đầy đủ Họ và tên!'
    )
    .max(160, 'Độ dài không hợp lệ!')
})

export type FormSchema = yup.InferType<typeof formSchema>
