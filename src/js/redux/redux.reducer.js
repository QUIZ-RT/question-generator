
import { UPDATE_TOPIC, UPDATE_QUIZ } from './redux.actions';

const initailState = {

};
const createReducer = function (state = initailState, action) {
  switch (action.typ) {
    case UPDATE_TOPIC:
      console.log('UPDATE_TOPIC');
      break;
    case UPDATE_QUIZ:
      console.log('UPDATE_QUIZ');
      break;
    default:
      return state;
  }
};
export default createReducer;
