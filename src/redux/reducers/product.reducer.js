import * as ActionType from "../ActionTypes";

const initVal = {
    products: []
}
export const productResucer = (state = initVal, action) => {
    switch (action.type) {
        case ActionType.READ_PRODUCTS: return {
            ...state,
            products: action.payload
        }
        case ActionType.ADD_PRODUCT: return {
            ...state,
            products: state.products.concat(action.payload)
        }
        
        default: return state
    }
}