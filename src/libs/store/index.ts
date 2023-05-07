import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import cartReducer from './cartSlice'
import { modeEnv } from '../constants/config'

const reducers = combineReducers({
  cartReducer
})

const config = {
  key: 'root',
  storage
}

const reducer = persistReducer(config, reducers)
const store = configureStore({
  reducer,
  devTools: !modeEnv.prod,
  middleware: [thunk]
})

export default store
