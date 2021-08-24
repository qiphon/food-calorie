import { createStore } from "redux";
import reducers from "./reducers";

const Store = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;
export type RootDispatch = typeof Store.dispatch;

export default Store;
