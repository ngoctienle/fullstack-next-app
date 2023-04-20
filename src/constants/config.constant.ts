export const modeEnv = {
  prod: process.env.NODE_ENV === 'production',
  dev: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test'
} as const
