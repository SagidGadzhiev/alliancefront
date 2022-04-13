import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

const initState = {};
const composeFunction = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose();
const composeEnchanters = composeFunction(applyMiddleware(thunk));
const store = createStore(rootReducer(), initState, composeEnchanters);

export default store;