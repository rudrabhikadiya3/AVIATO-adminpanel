import * as ActionType from "../ActionTypes";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const readProductsAction = () => async (dispatch) => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    dispatch({ type: ActionType.READ_PRODUCTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addProductsAction = (val) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "products"), val);
    dispatch({
      type: ActionType.ADD_PRODUCT,
      payload: { id: docRef.id, ...val },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    console.log(id);
    await deleteDoc(doc(db, "products", id));
    dispatch({ type: ActionType.DELETE_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const editProductAction = (val) => async (dispatch) => {
  try {
    const productRef = doc(db, "products", val.id);

    await updateDoc(productRef, {
      sprice: val.sprice,
      kwords: val.kwords,
      pname: val.pname,
      stock: val.stock,
      mrp: val.mrp,
      brand: val.brand,
    });
    dispatch({ type: ActionType.EDIT_PRODUCTS, payload: val });
  } catch (error) {
    console.log(error);
  }
};
