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
    let promiseArray = [];
    for (let dataObj of postDataObj) {
      promiseArray.push(new Promise((resolve, reject) => {
        firebaseInit.database().ref(`${refUrl}/${dataObj.id}`).set(dataObj, (error) => {
          if (error) {
            reject('there is some issue we will come back sortly');
          } else {
            resolve(dataObj);
          }
        });
      })
      );
    }
    promiseArray.all().then((savedResult) => {
      resolve(savedResult)
    }).catch((error) => {
      reject(error);
    })
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

  saveTopics(topicObj, resolve, reject) {
    const refUrl = 'topics/';
    this.saveFirebaseData(refUrl, topicObj, resolve, reject);
  }

  saveQuestions(quizId, quizObj, callback) {
    const refUrl = `topics/${quizId}`;
    this.saveFirebaseData(refUrl, quizObj, callback);
  }
};