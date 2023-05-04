import axios, { AxiosError } from 'axios'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Function merge các class từ tailwind
 * @param inputs classname thêm từ bên ngoài
 * @returns Ví dụ: px-2 py-2 => p-2
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
