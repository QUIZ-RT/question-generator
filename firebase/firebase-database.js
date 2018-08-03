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
    return firebaseInit.database().ref(refUrl).once('value').then(response => response.val());
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
            const optionKey=this.generateRandomQuizId('opt');
            tempObj[optionKey] = dataObj.options[i];
            if(dataObj.options[i]===dataObj.answer){
              dataObj.answer=optionKey;
            }
          }
          dataObj.options = tempObj;
        }
        firebaseInit.database().ref(`${refUrl}/${this.generateRandomQuizId(refId)}`).push(dataObj, (error) => {
          if (error) {
            rejected('there is some issue we will come back sortly');
          } else {
            resolved(dataObj);
          }
        });
      })
      );
    }
    Promise.all(promiseArray).then((savedResult) => {
      resolve(savedResult)
    }).catch((error) => {
      reject(error);
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
    this.saveFirebaseData(refUrl, loginTempObj, callback);
  }

  saveTopics(topicId, topicObj, resolve, reject) {
    const refUrl = `topics/${topicId}`;
    this.saveFirebaseData(refUrl, topicObj, resolve, reject);
  }

  saveQuestions(quizObj, resolve, reject) {
    const refUrl = 'questions';
    this.saveFirebaseArrayData(refUrl, quizObj, resolve, reject);
  }
};
