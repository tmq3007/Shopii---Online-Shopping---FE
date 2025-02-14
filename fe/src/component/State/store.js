import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {authReducer} from "./Authentication/Reducer";
import {thunk} from "redux-thunk";
import productReducer from "./Product/Reducer";
import categoryReducer from "./Category/Reducer";
import cartReducer from "./Cart/Reducer";
import wishlistReducer from "./Wishlist/Reducer";

const rootReducer = combineReducers({
    auth:authReducer,
    products: productReducer,
    categories: categoryReducer,
    carts: cartReducer,
    wishlists: wishlistReducer
})

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));