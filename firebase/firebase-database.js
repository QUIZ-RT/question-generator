import firebase from 'firebase/app';
import firebaseInit from './firebase';
import 'firebase/database';

function getCurrentUserInfo() {
    const userId = firebase.auth().currentUser.uid;
    return firebaseInit.database().ref(`/users/${userId}`).once('value').then((userRes) => {
        console.log((userRes.val() && userRes.val().username) || 'Anonymous');
    });
}
function saveCurrentLoggedUserInfo(userId, loginObj, callback) {
    const loginTempObj = { ...loginObj, isauthorized: false, isUserBlocked: false };
    firebaseInit.database().ref(`users/${userId}`).set(loginTempObj, (error) => {
        if (error) {
            alert('there is some issue we will come back sortly');
        } else {
            callback('logged SuccessFully');
            console.log('logged SuccessFully');
        }
    });
}
function saveTopics(topicId, topicObj, callback) {
    firebaseInit.database().ref(`topics/${topicId}`).set(topicObj, (error) => {
        if (error) {
            alert('there is some issue we will come back sortly');
        } else {
            callback('logged SuccessFully');
            console.log('logged SuccessFully');
        }
    });
}
function saveQuestions(quizId, quizObj, callback) {
    firebaseInit.database().ref(`questions/${quizId}`).set(quizObj, (error) => {
        if (error) {
            alert('there is some issue we will come back sortly');
        } else {
            callback('logged SuccessFully');
            console.log('logged SuccessFully');
        }
    });
}
function getQuestions(quizId, callback) {
    let refUrl = 'questions';
    if (quizId) {
        refUrl = `questions/${quizId}`;
    }
    firebaseInit.database().ref(refUrl).once('value').then((response) => {
        callback(response.val());
        console.log(response);
    });
}
function getTopics(topicId, callback) {
    let refUrl = 'topics';
    if (topicId) {
        refUrl = `topics/${topicId}`;
    }
    firebaseInit.database().ref(refUrl).once('value').then((response) => {
        callback(response.val());
        console.log(response);
    });
}
export {
    saveCurrentLoggedUserInfo, getCurrentUserInfo,
    saveTopics, saveQuestions,
    getQuestions, getTopics,
};
