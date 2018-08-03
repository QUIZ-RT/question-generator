const firebase = require('firebase/app');
const firebaseInit = require('./firebase');

require('firebase/database');

module.exports = class firebaseDatabase {
  generateRandomQuizId(name) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return (`${name}-${text}`);
  }
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
  saveFirebaseArrayData(refUrl, postDataObj, resolve, reject) {
    let promiseArray = [], refId = '';
    if (refUrl === 'questions') {
      refId = 'quiz';
    } else if (refUrl = 'topics') {
      refId = 'topic';
    }
    for (let dataObj of postDataObj) {
      promiseArray.push(new Promise((resolved, rejected) => {
        if (refUrl === 'questions') {
          let tempObj = {}
          for (let i = 0; i < dataObj.options.length; i += 1) {
            tempObj[this.generateRandomQuizId('opt')] = dataObj.options[i];
          }
          dataObj.options = tempObj;
        }
        firebaseInit.database().ref(`${refUrl} /${this.generateRandomQuizId(refId)}`).set(dataObj, (error) => {
          if (error) {
            rejected('there is some issue we will come back sortly');
          } else {
            resolved(dataObj);
          }
        });
      })
      );
    }
    Promise .all(promiseArray).then((savedResult) => {
      resolve(savedResult)
    }).catch((error) => {
      reject(error);
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

  saveTopics(topicObj, resolve, reject) {
    const refUrl = 'topics';
    this.saveFirebaseArrayData(refUrl, topicObj, resolve, reject);
  }

  saveQuestions(quizObj, resolve, reject) {
    const refUrl = 'questions';
    this.saveFirebaseArrayData(refUrl, quizObj, resolve, reject);
  }
};