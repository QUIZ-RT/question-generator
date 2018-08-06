import { createStore } from 'redux';
import createReducer from './redux.reducer';
// coding start
const store = createStore(createReducer, {});
export default store;
