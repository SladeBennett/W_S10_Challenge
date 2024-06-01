import { configureStore } from '@reduxjs/toolkit'
import { pizzasApi } from './pizzasApi'
import { orderReducer } from '../components/OrderList'

export const resetStore = () => configureStore({
  reducer: {
    filters: orderReducer,
    // add your reducer(s) here
    [pizzasApi.reducerPath]: pizzasApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzasApi.middleware,
    // if using RTK Query for your networking: add your middleware here
  ),
})

export const store = resetStore()
