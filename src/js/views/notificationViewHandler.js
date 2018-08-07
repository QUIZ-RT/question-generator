import { Toast, configureToasts } from 'toaster-js';
import Constants from '../shared/constants';
import DomManager from './domManager';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
/* eslint-disable no-debugger */
const document = window.document;

function createHTMLElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

const onClickUserDetail = (id) => {
  const userService = new UserService();
  userService.getUserDetail(id);
};

const onClickNextButtonhandler = (searchParam) => {
  const userService = new UserService();
  const skipCount = parseInt(document.getElementById('pagingSkip').value, 10) + Constants.PAGING_COUNT;
  userService.searchUsers(searchParam, skipCount);
  document.getElementById('pagingSkip').value = skipCount;
};

const onClickPrevButtonhandler = (searchParam) => {
  const userService = new UserService();
  let skipCount = parseInt(document.getElementById('pagingSkip').value, 10) - Constants.PAGING_COUNT;
  if (skipCount < 0) skipCount = 0;
  document.getElementById('pagingSkip').value = skipCount;
  userService.searchUsers(searchParam, skipCount);
};

class NotificationViewHandler {
  constructor() {
    this.userService = new UserService();
  }

  static getAParaNode(text, className) {
    const paraElement = document.createElement('p');
    paraElement.className = className;
    const textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }

  displayAccessRequestedUsers(restData) {
    let template = this.loadAdminAccessRequestedUsersTemplate(restData);
    jQuery('#topic-ul').remove();
    jQuery('#userManagerContainer').append(template);

    jQuery('#mainContainer').on('click', '.addAccessBtn', (e) => {
      const userId = jQuery(e.currentTarget).attr('data-id');
      const accessResult = true;
      this.userService.updateUserAccess(userId, accessResult)
        .then((data) => {
          //const a = new Toast("Access is now granted.", Toast.TYPE_DONE, Toast.TIME_NORMAL);
          let userController = new UserController();
          userController.init();
        }).then((err) => {
          console.log(err);
        });
    });

    jQuery('#mainContainer').on('click', '.revokeAccessBtn', (e) => {
      const userId = jQuery(e.currentTarget).attr('data-id');
      const accessResult = false;
      this.userService.updateUserAccess(userId, accessResult)
        .then((data) => {
          let userController = new UserController();
          userController.init();
          //const a = new Toast("Access is now revoked.", Toast.TYPE_DONE);
        }).then((err) => {
          console.log(err);
        });
    });
  }


  static displayUsers(restData) {
    const searchResultsPlaceholder = document.querySelector('#ResultContainer');

    searchResultsPlaceholder.innerHTML = '';

    let restCard;
    restData.forEach((userItem) => {
      restCard = DomManager.getAParaNode(
        userItem.displayName,
        '',
        // this.getRequiredUserDetails(userItem.user),
      );

      restCard.addEventListener('click', () => {
        onClickUserDetail(userItem.id);
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

  loadAdminAccessRequestedUsersTemplate(data, clickFunc) {
    let template = '<ul id="topic-ul" class="mdc-list" aria-orientation="vertical">';
    if (data) {
      data.forEach((userItem) => {
        let btnTemplate = ``;
        if (userItem.isAdmin) {
          btnTemplate = ` 
          <button data-id='${userItem.id}' class="revokeAccessBtn mdc-fab mdc-fab--extended">
            <span class="material-icons mdc-fab__icon mdc-fab__mini">security</span>
            <span class="mdc-fab__label mdc-fab__mini">Revoke</span>
          </button> `;

        } else if (userItem.adminAccessRequested) {
          btnTemplate = `
          <button data-id='${userItem.id}' class="addAccessBtn mdc-fab mdc-fab--extended">
            <span  class="material-icons mdc-fab__icon mdc-fab__mini">add</span>
            <span  class="mdc-fab__label mdc-fab__mini">Allow</span>
          </button>`;
        }


        template += `
        <li class=" mdc-list-item user-li" data-id='${userItem.id}' tabindex="-1">
            <span class="inline-user-content">${userItem.displayName}</span>
            <span class="inline-user-content">${userItem.email}</span>
            <div class="inline-user-btn">
                ` + btnTemplate + `                
            </div>
        </li>`;
      });
    }
    template += '</ul';
    return template;
  }

  // export function loadButtons() {
  //   return `<div id='topicManagerContainer' class='pt-5'><div class="text-center">
  //   <a  class='addTopicBtn' tabindex="-1">
  //   <i class="material-icons topicIcon">
  // add_circle
  // </i>
  // </a>

  // </div> </div>
  // `;
  // }

}

export default NotificationViewHandler;
