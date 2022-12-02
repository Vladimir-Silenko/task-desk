import { combineReducers, legacy_createStore as createStore } from "redux";
import { listReducer } from "../reducers/listReducer";

const reducers = combineReducers({
    list: listReducer,
})
const store = createStore(reducers)
export default store