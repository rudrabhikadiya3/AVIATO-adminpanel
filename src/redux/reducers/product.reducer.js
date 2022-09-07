import * as ActionType from "../ActionTypes";

const initVal = {
  products: [],
};
export const productResucer = (state = initVal, action) => {
  switch (action.type) {
    case ActionType.READ_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ActionType.ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    case ActionType.DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
      };
    case ActionType.EDIT_PRODUCTS:
      return {
        ...state,
        products: state.products.map(p => {
            if (p.id === action.payload.id) {
                return action.payload
            } else {
                return p
            }
        }),
      };
    default:
      return state;
  }
};
