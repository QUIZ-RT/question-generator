
import { UPDATE_TOPIC, UPDATE_QUIZ } from './redux.actions';

const initailState = {

};
const createReducer = function (state = initailState, action) {
  switch (action.type) {
    case 'ADD_TOPIC':
      return Object.assign({}, state, {
        topics: [...state.topics, {
          id: action.topic.id,
          topicText: action.topic.topicText,
          topicUrl: action.topic.topicUrl,
          createdBy: action.topic.createdBy,
          createdDate: new Date(),
          modifiedDate: new Date(),
          published: true,
        }],
      });

    case UPDATE_TOPIC:
      console.log('UPDATE_TOPIC');
      break;
    case UPDATE_QUIZ:
      console.log('UPDATE_QUIZ');
      break;
    default:
      return state;
  }
  return state;
};
export default createReducer;
