
import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from '../reducer/user.reducer'
import { CollectionApi } from '../api/collection.api'
import { ProductApi } from '../api/product.api'
import { cartApi } from '../api/cart.api'
import { customerApi } from '../api/customer.api'
import { orderApi } from '../api/order.api'

const storeConfig = configureStore({
    reducer:{
        user: useReducer,
        [CollectionApi.reducerPath]: CollectionApi.reducer,
        [ProductApi.reducerPath]:ProductApi.reducer,
        [cartApi.reducerPath]:cartApi.reducer,
        [customerApi.reducerPath]:customerApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
        .concat(CollectionApi.middleware)
        .concat(ProductApi.middleware)
        .concat(cartApi.middleware)
        .concat(customerApi.middleware)
        .concat(orderApi.middleware)
})

export default storeConfig