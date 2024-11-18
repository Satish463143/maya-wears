
import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from '../reducer/user.reducer'
import { CollectionApi } from '../api/collection.api'
import { ProductApi } from '../api/product.api'

const storeConfig = configureStore({
    reducer:{
        user: useReducer,
        [CollectionApi.reducerPath]: CollectionApi.reducer,
        [ProductApi.reducerPath]:ProductApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
        .concat(CollectionApi.middleware)
        .concat(ProductApi.middleware),
})

export default storeConfig