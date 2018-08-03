import UserService from '../services/userService';
import NotificationViewHandler from '../views/notificationViewHandler';

class UserController {
  constructor() {
    this.userService = new UserService();
    this.notificationViewHandler = new NotificationViewHandler();
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
    const userId = 'W8X5SCrcRfcIIhmHcqffIvOkRts2';
    this.userService
      .updateFcmToken(userId, fcmToken)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserAccess(accessResult) {
    const userId = 'W8X5SCrcRfcIIhmHcqffIvOkRts2';
    this.userService
      .updateUserAccess(userId, accessResult)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateAccessRequest() {
    const userId = 'W8X5SCrcRfcIIhmHcqffIvOkRts2';
    this.userService
      .updateAccessRequest(userId)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default UserController;
