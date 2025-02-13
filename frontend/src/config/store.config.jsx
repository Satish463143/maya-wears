
import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from '../reducer/user.reducer'
import customerReducer from '../reducer/customer.reducer'
import { CollectionApi } from '../api/collection.api'
import { ProductApi } from '../api/product.api'
import { cartApi } from '../api/cart.api'
import { customerApi } from '../api/customer.api'
import { orderApi } from '../api/order.api'
import { FeaturedProductApi } from '../api/featuredProduct.api'
import {BannersApi} from '../api/banners.api'
import { GalleryApi } from '../api/gallery.api'
import { CustomerGalleryApi } from '../api/customergallery.api'
import {MainBannerApi} from '../api/mainBanner.api'
import { PromoApi } from '../api/promo.api'

const storeConfig = configureStore({
    reducer:{
        user: useReducer,
        customer: customerReducer,
        [CollectionApi.reducerPath]: CollectionApi.reducer,
        [ProductApi.reducerPath]:ProductApi.reducer,
        [cartApi.reducerPath]:cartApi.reducer,
        [customerApi.reducerPath]:customerApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [FeaturedProductApi.reducerPath]:FeaturedProductApi.reducer,
        [BannersApi.reducerPath]:BannersApi.reducer,
        [GalleryApi.reducerPath]:GalleryApi.reducer,
        [CustomerGalleryApi.reducerPath]:CustomerGalleryApi.reducer,
        [MainBannerApi.reducerPath]:MainBannerApi.reducer,
        [PromoApi.reducerPath]:PromoApi.reducer

    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware()
        .concat(CollectionApi.middleware)
        .concat(ProductApi.middleware)
        .concat(cartApi.middleware)
        .concat(customerApi.middleware)
        .concat(orderApi.middleware)
        .concat(FeaturedProductApi.middleware)
        .concat(BannersApi.middleware)
        .concat(GalleryApi.middleware)
        .concat(CustomerGalleryApi.middleware)
        .concat(MainBannerApi.middleware)
        .concat(PromoApi.middleware)
})

export default storeConfig