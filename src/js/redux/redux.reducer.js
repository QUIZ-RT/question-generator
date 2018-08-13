
import { UPDATE_TOPIC, UPDATE_QUIZ } from './redux.actions';

const initailState = {

};
const createReducer = function (state = initailState, action) {
  switch (action.type) {
    case 'ADD_TOPIC':
    return Object.assign({}, state, {
      topics: [...state.topics, {id: action.topic.id, topicText: action.topic.topicText, 
      topicUrl: action.topic.topicUrl, createdBy: action.topic.createdBy,
      createdDate: new Date(),
      modifiedDate: new Date(),
      published: true,
      }],
      actionType: action.type
    });
      
    case UPDATE_TOPIC:
    return Object.assign({}, state, {
      topics: state.topics.map((topic) => topic.id === action.topic.id ? action.topic : topic),
      actionType: action.type
      });
      break;

      case 'ADD_ALL_TOPICS':
      return Object.assign({},state, {
        topics: [...state.topics,...action.topics],
        actionType: action.type
      });
      break;
      case 'DELETE_ALL_TOPICS':
      return Object.assign({},state, {
        topics: [],
        actionType: action.type
      });
      break;

      case 'DELETE_TOPIC':
      return Object.assign({},state,{
        topics: state.topics.filter((topic) => {
          console.log(topic.id != action.topic.id);
        //  console.log(action.topic.id)
          return topic.id != action.topic.id
        }),
        actionType: action.type
      });
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
