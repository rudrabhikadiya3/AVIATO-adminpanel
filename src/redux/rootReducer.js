import { combineReducers } from "redux";
import { productResucer } from "./reducers/product.reducer";


const rootReducer = combineReducers({
    products : productResucer
})

export default rootReducer;