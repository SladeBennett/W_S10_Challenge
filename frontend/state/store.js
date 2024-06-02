import { configureStore } from '@reduxjs/toolkit'
import { pizzasApi } from './pizzasApi'
import reducer from './ordersSlice'


export const resetStore = () => configureStore({
  reducer: {
    filters: reducer,
    // add your reducer(s) here
    [pizzasApi.reducerPath]: pizzasApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzasApi.middleware,
    // if using RTK Query for your networking: add your middleware here
  ),
})

export const store = resetStore()
