const firebase = require('firebase/app');
const firebaseInit = require('./firebase');
const serverConstants = require('./server-constants');
const keysStoreObj = {};
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

  getFirebaseData(refUrl, pagiNationObj) {
    console.log(pagiNationObj);
    if (pagiNationObj) {
      if (pagiNationObj.key) {
        return firebaseInit.database().ref(refUrl).orderByKey().startAt(pagiNationObj.key).limitToFirst(serverConstants.PAGINATION_LIMIT).once('value').then(response => {
          const result = response.val();
          if (result) {
            const keys = Object.keys(result);
            if (keys && keys.length) {
              if (!keysStoreObj[pagiNationObj.refCollection]) {
                keysStoreObj[pagiNationObj.refCollection] = {};
              }
              const thisKey = keys[keys.length - 1];
              keysStoreObj[pagiNationObj.refCollection][pagiNationObj.pageNumber + 1] = thisKey
              console.log(thisKey);
              if (keys.length > serverConstants.PAGINATION_LIMIT - 1) {
                delete result[thisKey];
              }
            }
          }
          return result;
        });
      } else {
        return firebaseInit.database().ref(refUrl).orderByKey().limitToFirst(serverConstants.PAGINATION_LIMIT).once('value').then(response => {
          const result = response.val();
          if (result) {
            const keys = Object.keys(result);
            if (keys && keys.length) {
              if (!keysStoreObj[pagiNationObj.refCollection]) {
                keysStoreObj[pagiNationObj.refCollection] = {};
              }
              const thisKey = keys[keys.length - 1];
              keysStoreObj[pagiNationObj.refCollection][pagiNationObj.pageNumber + 1] = thisKey
              console.log(thisKey);
              if (keys.length > serverConstants.PAGINATION_LIMIT - 1) {
                delete result[thisKey];
              }
            }
          }
          return result;
        });
      }
    } else {
      return firebaseInit.database().ref(refUrl).once('value').then(response => response.val());
    }
  }

  deleteFirebaseData(refUrl) {
    return firebaseInit.database().ref(refUrl).remove();
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
  saveFirebaseArrayData(refUrl, postDataObj, topicId, resolve, reject) {
    let promiseArray = [], refId = '';
    if (refUrl === 'questions') {
      refId = 'quiz';
    } else if (refUrl = 'topics') {
      refId = 'topic';
    }
    if (postDataObj) {
      for (let dataObj of postDataObj) {
        promiseArray.push(new Promise((resolved, rejected) => {
          if (refUrl === 'questions') {
            let tempObj = {}
            for (let i = 0; i < dataObj.options.length; i += 1) {
              const optionKey = this.generateRandomQuizId('opt');
              tempObj[optionKey] = dataObj.options[i];
              if (dataObj.options[i] === dataObj.answer) {
                dataObj.answer = optionKey;
              }
            }
            dataObj.options = tempObj;
          }
          const tempKey = this.generateRandomQuizId(refId);
          firebaseInit.database().ref(`${refUrl}/${topicId}/${tempKey}`).set(dataObj, (error) => {
            if (error) {
              rejected('there is some issue we will come back sortly');
            } else {
              resolved({ id: tempKey, data: dataObj });
            }
          });
        })
        );
      }
    }
    Promise.all(promiseArray).then((savedResult) => {
      if (savedResult) {
        const savedObj = {};
        savedObj[topicId] = {};
        for (var i = 0; i < savedResult.length; i++) {
          const thisRes = savedResult[i];
          savedObj[topicId][thisRes.id] = thisRes.data;
        }
        resolve(savedObj);
      }
      else {
        resolve(savedResult);
      }
    }).catch((error) => {
      reject(error);
    });
  }

  getCurrentUserInfo() {
    const userId = firebase.auth().currentUser.uid;
    return this.getFirebaseData(`/users/${userId}`);
  }

  getTopics(topicId, pageNumber) {
    let refUrl = 'topics';
    let pagiNationObj = null;
    if (topicId) {
      refUrl = `topics/${topicId}`;
    }
    if (pageNumber) {
      console.log(keysStoreObj);
      pagiNationObj = {};
      pagiNationObj["pageNumber"] = pageNumber;
      pagiNationObj["refCollection"] = 'topics';
      const thisObj = keysStoreObj['topics'];
      if (thisObj && thisObj[pageNumber]) {
        pagiNationObj["key"] = thisObj[pageNumber];
      }
    }
    return this.getFirebaseData(refUrl, pagiNationObj);
  }

  getTopicsPage(topicId, pageNumber) {
    let refUrl = 'topicsTest';
    let pagiNationObj = null;
    if (topicId) {
      refUrl = `topicsTest/${topicId}`;
    }
    if (pageNumber) {
      console.log(keysStoreObj);
      pagiNationObj = {};
      pagiNationObj["pageNumber"] = pageNumber;
      pagiNationObj["refCollection"] = 'topics';
      const thisObj = keysStoreObj['topics'];
      if (thisObj && thisObj[pageNumber]) {
        pagiNationObj["key"] = thisObj[pageNumber];
      }
    }
    return this.getFirebaseData(refUrl, pagiNationObj);
  }

  getQuestions(topicId, quizId, pageNumber) {
    let refUrl = 'questions';
    let pagiNationObj = null;
    if (topicId) {
      refUrl = `questions/${topicId}`;
    }
    if (topicId && quizId) {
      refUrl = `questions/${topicId}/${quizId}`;

    }
    if (pageNumber) {
      console.log(keysStoreObj);
      pagiNationObj = {};
      pagiNationObj["pageNumber"] = pageNumber;
      pagiNationObj["refCollection"] = 'questions';
      const thisObj = keysStoreObj['questions'];
      if (thisObj && thisObj[pageNumber]) {
        pagiNationObj["key"] = thisObj[pageNumber]
      }
    }
    return this.getFirebaseData(refUrl, pagiNationObj);
  }
  getUsers(userId) {
    let refUrl = 'users';
    if (userId) {
      refUrl = `users/${userId}`;
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

  saveTopicsPage(topicId, topicObj, resolve, reject) {

    const refUrl = `topicsTest/${topicId}`;
    this.saveFirebaseData(refUrl, topicObj, resolve, reject);
  }

  saveQuestions(quizObj, resolve, reject) {
    const refUrl = 'questions';
    if (quizObj && quizObj.length) {
      const topicId = quizObj[0].topic.toLowerCase();
      this.saveFirebaseArrayData(refUrl, quizObj, topicId, resolve, reject);
    }
  }
  updateQuestion(quesId, newQuesObj, resolve, reject) {
    const refUrl = `questions`;
    this.updateFirebaseData(refUrl, newQuesObj.topic, newQuesObj.id, newQuesObj, resolve, reject);
  }

  updateFirebaseData(refUrl, topic, quesId, dataObj, resolve, reject) {
    let variable_ref = `${refUrl}/${topic}/${quesId}`;
    firebaseInit.database().ref(`${refUrl}/${topic}/${quesId}`).update(dataObj, (error) => {
      if (error) {
        reject('there is some issue we will come back sortly');
      } else {
        resolve('SuccessFully');
      }
    });
  }

  deleteAllQuestions() {
    this.deleteFirebaseData("questions");
  }
};
