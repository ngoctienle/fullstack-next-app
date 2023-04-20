import chalk from 'chalk'
import mongoose from 'mongoose'

import { dbState, modeEnv } from '~/constants'

import { TypeConnectionDb } from '~/types/db.type'

const myConnect: TypeConnectionDb = {}
const connected = chalk.bold.cyan
const disconnect = chalk.bold.red

async function connectDatabase() {
  if (myConnect.isConnected) {
    console.log(connected('Database is connected!'))
    return
  }

  if (mongoose.connections.length > 0) {
    myConnect.isConnected = mongoose.connections[0].readyState
    if (myConnect.isConnected === dbState.connected) {
      console.log(connected('Used again previous connection!'))
      return
    }

    await mongoose.disconnect()
  }

  const db = await mongoose.connect(process.env.MONGODB_URL as string)

  myConnect.isConnected = db.connections[0].readyState
}

async function disconnectDatabase() {
  if (myConnect.isConnected) {
    if (modeEnv.prod) {
      await mongoose.disconnect().then(() => console.log(disconnect('Database is disconnected!')))
      myConnect.isConnected = false
    } else {
      console.log(connected('Database still running!'))
    }
  }
}

const db = { connectDatabase, disconnectDatabase }

export default db
