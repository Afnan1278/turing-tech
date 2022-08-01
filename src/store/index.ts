// Store
import { createStore } from "redux";

// initial store
type user = {
    id: string | null,
    username: string | null,
}

type initState = {
    init: boolean, // first time loading 
    isLogin: boolean,
    user: user | null,
    access_token: string | null
}

const initialState: initState = {
    access_token: null,
    init: false,
    isLogin: false,
    user: { id: null, username: null },
}

const reducer = (state: initState = initialState, action: any) => {
    let payload = action.payload;
    return { ...state, ...payload };
}


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__;
    }
}
// create store from reducer
export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());