import { TypeDbState } from '~/types/db.type'

export const dbState: TypeDbState = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3
} as const
