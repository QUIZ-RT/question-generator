import Constants from '../shared/Constants';
import DomManager from './domManager';
import UserController from '../services/userService';

const document = window.document;

function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

const onClickUserDetail = (id) => {
  const userController = new UserController();
  userController.getUserDetail(id);
};

const onClickNextButtonhandler = (searchParam) => {
  const userController = new UserController();
  const skipCount = parseInt(document.getElementById('pagingSkip').value) + Constants.PAGING_COUNT;
  userController.searchUsers(searchParam, skipCount);
  document.getElementById('pagingSkip').value = skipCount;
};

const onClickPrevButtonhandler = (searchParam) => {
  const userController = new UserController();
  let skipCount = parseInt(document.getElementById('pagingSkip').value) - Constants.PAGING_COUNT;
  if (skipCount < 0) skipCount = 0;
  document.getElementById('pagingSkip').value = skipCount;
  userController.searchUsers(searchParam, skipCount);
};

class NotificationViewHandler {
  constructor() {
    this.userController = new UserController();
  }

  static getAParaNode(text, className) {
    const paraElement = document.createElement('p');
    paraElement.className = className;
    const textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }

  static displayUsers(restData) {
    const searchResultsPlaceholder = document.querySelector('#ResultContainer');
    // const resultNavigationContainer = document.getElementById( 'ResultNavigationContainer');

    searchResultsPlaceholder.innerHTML = '';
    const totalitemsFound = restData.results_found;
    let paraNode;
    if (totalitemsFound === 0 || restData.results_shown === 0) {
      paraNode = DomManager.getAParaNode(
        'Oops, Your search returned no results !!',
        'text-danger',
      );

      searchResultsPlaceholder.appendChild(paraNode);
      return;
    }

    paraNode = DomManager.getAParaNode(
      `Showing ${restData.results_start} - ${restData.results_start
      + Constants.PAGING_COUNT} of ${totalitemsFound} users found.`,
      'text-success',
    );
    let restCard;
    restData.forEach((userItem) => {
      restCard = DomManager.getAParaNode(
        userItem.name,
        '',
        // this.getRequiredUserDetails(userItem.user),
      );

      restCard.addEventListener('click', () => {
        onClickUserDetail(userItem.user.id);
      });

      searchResultsPlaceholder.appendChild(restCard);
    });

    const prevAnchor = createHTMLElement(
      '<a class="previous btn">« Previous</a>',
    );

    const nextAnchor = createHTMLElement(
      '<a class="next btn" data-info="0">Next »</a>',
    );

    nextAnchor.addEventListener('click', () => {
      onClickNextButtonhandler(restData.searchParam);
    });

    prevAnchor.addEventListener('click', () => {
      onClickPrevButtonhandler(restData.searchParam);
    });

    // resultNavigationContainer.innerHTML = '';
    // resultNavigationContainer.appendChild(paraNode);
    // resultNavigationContainer.appendChild(prevAnchor);
    // resultNavigationContainer.appendChild(nextAnchor);
  }

  static getRequiredUserDetails(restData) {
    const user = {
      'Average cost for two': restData.average_cost_for_two,
      'Phone Numbers': restData.phone_numbers,
    };
    user.Name = restData.name;
    user.Address = restData.location.address;
    user.Rating = restData.user_rating.aggregate_rating;

    return user;
  }
}

export default NotificationViewHandler;
