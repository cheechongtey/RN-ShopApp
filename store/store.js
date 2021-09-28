import { createStore, combineReducers } from "redux";

import { cartReducer, productReducer } from "./reducers";

const rootReducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

const store = createStore(rootReducers);

export default store;
