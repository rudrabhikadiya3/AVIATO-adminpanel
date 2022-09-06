
import * as ActionType from "../ActionTypes";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const readProductsAction = () => async(dispatch) => {
    try {
        let data = []
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()})
        });
        dispatch({type: ActionType.READ_PRODUCTS, payload: data})
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}
export const addProductsAction = (val) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "products"), val);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionType.ADD_PRODUCT, payload: { id: docRef.id, ...val } })
    } catch (error) {
        console.log(error);
    }
}