const firebase = require('firebase/app');
const firebaseInit = require('./firebase');

require('firebase/database');

module.exports = class firebaseDatabase {

  getFirebaseData(refUrl) {
    return firebaseInit.database().ref(refUrl).once('value').then((response) => {
      return response.val();
    });
  }
  saveFirebaseData(refUrl, postDataObj, resolve, reject) {
    firebaseInit.database().ref(refUrl).set(postDataObj, (error) => {
      if (error) {
        reject('there is some issue we will come back sortly');
      } else {
        resolve('SuccessFully');
      }
    });
  }

  getCurrentUserInfo() {
    const userId = firebase.auth().currentUser.uid;
    return this.getFirebaseData(`/users/${userId}`);
  }

  getUsers(userId) {
    let refUrl = 'users';
    if (userId) {
      refUrl = `users/${userId}`;
    }
    return this.getFirebaseData(refUrl);
  }
  getTopics(topicId) {
    let refUrl = 'topics';
    if (topicId) {
      refUrl = `topics/${topicId}`;
    }
    return this.getFirebaseData(refUrl);
  }

  getQuestions(quizId) {
    let refUrl = 'questions';
    if (quizId) {
      refUrl = `questions/${quizId}`;
    }
    return this.getFirebaseData(refUrl);
  }

  seveLoggedUserInfo(userId, loginObj, callback) {
    const refUrl = `users/${userId}`;
    this.saveFirebaseData(refUrl, loginObj, callback)
  }

  saveTopics(topicId, topicObj, resolve, reject) {
    const refUrl = `topics/${topicId}`;
    this.saveFirebaseData(refUrl, topicObj, resolve, reject);
  }

  saveQuestions(quizId, quizObj, callback) {
    const refUrl = `topics/${quizId}`;
    this.saveFirebaseData(refUrl, quizObj, callback);
  }
};