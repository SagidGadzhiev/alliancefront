import { combineReducers } from 'redux';
import storeItems from './storeItems';

const rootReducer = () => combineReducers({ storeItems });

export default rootReducer;
