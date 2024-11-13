
import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from '../reducer/user.reducer'

const storeConfig = configureStore({
    reducer:{
        user: useReducer
    }
})

export default storeConfig