import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;
