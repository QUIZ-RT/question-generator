const firebaseDatabase = require("./firebase-database");
const FCMNotifier = require("./firebase-fcm.notifier");
const ServerConstants = require('../firebase/server-constants');

 
const fcmNotifier = new FCMNotifier();
const databaseFunc = new firebaseDatabase();

module.exports = (app) => {
    app.get('/firebase/api/questions', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getQuestions(null).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });

    app.get('/firebase/api/questions/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getQuestions(req.params.id).then((data) => {
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
            databaseFunc.getTopics(null).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });

    app.get('/firebase/api/topics/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getTopics(req.params.id).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
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
    app.get('/firebase/users/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getUsers(req.params.id)
                .then((data) => {
                    res.json(data);
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    });

    app.post('/firebase/api/topics/delete', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req);
            databaseFunc.saveTopics(req.body.id, null, resolve, reject)
        }).then((data) => {
            res.json(req.body);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.post('/firebase/users', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.seveLoggedUserInfo(req.body.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(req.body);
        })
            .catch((err) => {
                res.end(err);
            });
    });

    app.post('/firebase/api/topics', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req);
            databaseFunc.saveTopics(req.body.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(req.body);
            fcmNotifier.sendNotification(ServerConstants.NOTIFICATION_TOPIC_UPDATE, req.body.id, req.body.createdBy);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.post('/firebase/api/questions', (req, res) => { // it will current user detail on screan       
        return new Promise((resolve, reject) => {
            databaseFunc.saveQuestions(req.body, resolve, reject)
        }).then((data) => {
            res.json(req.body);
        })
            .catch((err) => {
                console.log(err)
            });
    });

};
