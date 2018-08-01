import firebaseInit from './firebase';

require('firebase/database');

function getCurrentUserInfo() {
    const userId = firebaseInit.auth().currentUser.uid;
    return firebaseInit.database().ref(`/users/${userId}`).once('value').then((userRes) => {
        console.log((userRes.val() && userRes.val().username) || 'Anonymous');
    });
}
function saveCurrentLoggedUserInfo(userId, loginObj) {
    const loginTempObj = { ...loginObj, isauthorized: false };
    firebaseInit.database().ref(`users/${userId}`).set(loginTempObj, (error) => {
        if (error) {
            // The write failed...
        } else {
            // call update ui method after login
            console.log('logged SuccessFully');
        }
    });
}

export { saveCurrentLoggedUserInfo, getCurrentUserInfo };
