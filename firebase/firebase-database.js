const firebase = require('firebase/app');
const firebaseInit = require('./firebase');

require('firebase/database');

module.exports = class firebaseDatabase {

  getFirebaseData(refUrl) {
    return firebaseInit.database().ref(refUrl).once('value').then((response) => {
      return response.val();
    });
  }
  saveFirebaseData(refUrl, postDataObj, callback) {
    firebaseInit.database().ref(refUrl).set(postDataObj, (error) => {
      if (error) {
        alert('there is some issue we will come back sortly');
      } else {
        callback('logged SuccessFully');
        console.log('SuccessFully');
      }
    });
  }

  getCurrentUserInfo() {
    const userId = firebase.auth().currentUser.uid;
    return this.getFirebaseData(`/users/${userId}`);
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
    const loginTempObj = { ...loginObj, isauthorized: false, isUserBlocked: false };
    const refUrl = `users/${userId}`;
    this.saveFirebaseData(refUrl, loginTempObj, callback)
  }

  saveTopics(topicId, topicObj, callback) {
    const refUrl = `topics/${topicId}`;
    this.saveFirebaseData(refUrl, topicObj, callback);
  }

  saveQuestions(quizId, quizObj, callback) {
    const refUrl = `topics/${quizId}`;
    this.saveFirebaseData(refUrl, quizObj, callback);
  }
};