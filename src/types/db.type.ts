export type TypeConnectionDb = {
  isConnected?: number | boolean
}
export type TypeDbState = {
  [key in 'disconnected' | 'connected' | 'connecting' | 'disconnecting']: number
}
