import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import movieReducer from "./reducers/movieReducer"
import paymentReducer from "./reducers/paymentReducer";

const rootReducer = combineReducers({
    movies: movieReducer,
    payment: paymentReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store