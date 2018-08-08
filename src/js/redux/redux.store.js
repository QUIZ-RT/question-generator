import { createStore } from 'redux';
import createReducer from './redux.reducer';
// coding start
const initialState = {
    topics: [],
    actionType:''
}
const store = createStore(createReducer, initialState);
export default store;
