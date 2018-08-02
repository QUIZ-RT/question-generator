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
        // alert("User data received, name : " + data[0].name);
        NotificationViewHandler.displayUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateFcmToken(userId, fcmToken) {
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
export default UserController;
