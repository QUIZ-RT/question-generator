import { Toast, configureToasts, deleteAllToasts } from 'toaster-js';
import UserController from './controllers/userController';
import 'toaster-js/default.scss'; // Assuming CSS/SCSS loader is present
// Import styles from SCSS: @import "../node_modules/toaster-js/default.scss";
// Or just copy default styles to your project from node_modules/toaster-js/default.*css.
configureToasts({
  topOrigin: 20, // [default=0] Y-axis origin of the messages.
  deleteDelay: 300, // time until the toast is completely removed from the DOM after deleting.
});


// configureToasts({
//     topOrigin: 0,
//     deleteDelay: 300
// });
// deleteAllToasts();

// let element = document.createElement("div");
// element.textContent = "You can pass any HTML elements to Toast. Clicking on this one deletes it!";
// let newToast = new Toast(element, Toast.TYPE_MESSAGE);
// element.addEventListener("click", function(){
//     alert("I am going to open the users list screen")
//     newToast.delete()
//     var userController = new UserController();
//     userController.searchUsers();
// } ); debugger

// new Toast("Welcome!");
// new Toast("There is a lot of toasts!", Toast.TYPE_ERROR, Toast.TIME_NORMAL);
