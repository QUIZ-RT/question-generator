import UserService from '../services/userService';
import NotificationViewHandler from '../views/notificationViewHandler';
import Constants from '../shared/constants';
import { Toast, configureToasts , deleteAllToasts} from 'toaster-js';


class UserController {
  constructor() {
    this.userService = new UserService();
  }

  init() {
    deleteAllToasts();
    this.notificationViewHandler = new NotificationViewHandler();
    this.prepareUserView();
    this.loadAdminAccessRequestedusers();
  }

  prepareUserView() {

    jQuery('#mainContainer').empty();
    const template = this.getContainerTemplate();
    jQuery('#mainContainer').append(template);
  }

  loadAdminAccessRequestedusers(query, offset) {
    this.userService.getAdminAccessRequestedusers(query)
      .then((data) => {
        // console.log(data);
        this.notificationViewHandler.displayAccessRequestedUsers(data);
      }).then((err)=> {
        console.log(err);
        if(err)
        {
          let a = new Toast(err.message, Toast.TYPE_ERROR);
        }
      })
      .catch((err) => {
        console.log(err);
        if(err)
        {
          let a = new Toast(err.message, Toast.TYPE_ERROR);
        }

      });
  }

  searchUsers(query, offset) {
    console.log(query + offset);
    this.userService
      .searchUsers(query)
      .then((data) => {
        console.log(data);
        const refinedData = [];
        for (const property in data) {
          if (data.hasOwnProperty(property)) {
            refinedData.push(data[property]);
          }
        }
        NotificationViewHandler.displayUsers(refinedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateFcmToken(fcmToken) {
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.userService
        .updateFcmToken(userId, fcmToken)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  updateUserAccess(userId, accessResult) {
    this.userService
      .updateUserAccess(userId, accessResult)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateAccessRequest(userId) {
    this.userService
      .updateAccessRequest(userId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getContainerTemplate() {
    return `<div id='userManagerContainer' class='pt-3'>
              <div class="text-center">
                <p> <b> Access manager </b></p>
              </div> 
            </div> `;
  }
}
export default UserController;
