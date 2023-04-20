import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {}
})

/* export const {} = cartSlice.actions */

const cartReducer = cartSlice.reducer

export default cartReducer
