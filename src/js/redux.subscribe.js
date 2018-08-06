import { UPDATE_TOPIC, UPDATE_QUIZ } from './redux/redux.actions';
import store from './redux/redux.store';

function renderWidgets() {
  const curentState = store.getState();
  if (curentState.action === UPDATE_TOPIC) {
    console.log('perform some actions');
  }
  if (curentState.action === UPDATE_QUIZ) {
    console.log('perform some actions');
  }
}
function reduxSubsCriber() {
  store.subscribe(renderWidgets);
}
export default reduxSubsCriber;
