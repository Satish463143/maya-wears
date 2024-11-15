
import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from '../reducer/user.reducer'
import { CollectionApi } from '../api/collection.api'

const storeConfig = configureStore({
    reducer:{
        user: useReducer,
        [CollectionApi.reducerPath]: CollectionApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(CollectionApi.middleware)
})

export default storeConfig