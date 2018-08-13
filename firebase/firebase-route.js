const firebaseDatabase = require("./firebase-database");
const FCMNotifier = require("./firebase-fcm.notifier");
const ServerConstants = require('../firebase/server-constants');


const fcmNotifier = new FCMNotifier();
const databaseFunc = new firebaseDatabase();

module.exports = (app) => {
    // Quetion releted api call
    app.get('/firebase/api/questions', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getQuestions().then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.get('/firebase/api/questions/:topicId', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            const topicId = req.params.topicId;
            console.log(topicId + ".......");
            databaseFunc.getQuestions(topicId).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.get('/firebase/api/questions/pagination/:topicId/:pagenumber', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            const topicId = req.params.topicId;
            const pageNumber = parseInt(req.params.pagenumber);
            console.log(topicId + "......." + pageNumber);
            databaseFunc.getQuestions(topicId, null, pageNumber).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.get('/firebase/api/questions/:topicId/:quizId', (req, res) => { // it will current user detail on screan       
        return new Promise((resolve, reject) => {
            const topicId = req.params.topicId;
            const quizId = req.params.quizId;
            console.log(topicId + quizId);
            databaseFunc.getQuestions(topicId, quizId).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.post('/firebase/api/updateQuestion', (req, res) => {
        return new Promise((resolve, reject) => {
            databaseFunc.updateQuestion(req.body.quesId, req.body, resolve, reject)
        }).then((data) => {
            res.json(data);
            //  fcmNotifier.sendNotification(ServerConstants.NOTIFICATION_TOPIC_UPDATE, req.body.id, req.body.createdBy);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.post('/firebase/api/questions', (req, res) => { // it will current user detail on screan       
        return new Promise((resolve, reject) => {
            databaseFunc.saveQuestions(req.body, resolve, reject)
        }).then((data) => {
            res.json(data);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.delete('/firebase/api/questions', (req, res) => { // it will current user detail on screan       
        return new Promise((resolve, reject) => {
            databaseFunc.deleteAllQuestions(resolve, reject)
        }).then((data) => {
            res.json(data);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    // topics releted api call
    app.get('/firebase/api/topics/pagination/:pageNumber', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            const pageNumber = parseInt(req.params.pageNumber);
            console.log("......." + pageNumber);
            databaseFunc.getTopicsPage(null, pageNumber).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.get('/firebase/api/topics', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getTopics().then((data) => {
                res.json(Object.values(data));
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.get('/firebase/api/topics/:topicId', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getTopics(req.params.topicId).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.delete('/firebase/api/topics/:topicId', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req.params.topicId);
            databaseFunc.deleteTopics(req.params.topicId, resolve, reject)
        }).then((data) => {
            res.json(data);
        })
            .catch((err) => {
                console.log(err);
            });
    });
    app.post('/firebase/api/topics', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req);
            databaseFunc.saveTopics(req.body.id.toLowerCase(), req.body, resolve, reject)
        }).then((data) => {
            res.json(data);
            fcmNotifier.sendNotification(ServerConstants.NOTIFICATION_TOPIC_UPDATE, req.body.id, req.body.createdBy);
        })
            .catch((err) => {
                console.log(err)
            });
    });

    
    // user releted api call
    app.get('/firebase/currentusers', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getCurrentUserInfo().then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.get('/firebase/users/:userId', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getUsers(req.params.userId)
                .then((data) => {
                    res.json(data);
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    });
    app.post('/firebase/users', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.seveLoggedUserInfo(req.body.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(data);
        })
            .catch((err) => {
                res.end(err);
            });
    });
};
