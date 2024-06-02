import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'orders_state',
    initialState: { size: 'All'},
    reducers: {
        setSize(state, action) {
            state.size = action.payload
        },
    }
})

export default slice.reducer
export const { setSize } = slice.actions











// const initialState = {
//     size: 'All'
//   }
  
//   export const orderReducer = (state = initialState) => {
//     return state
//   }