const firebaseDatabase = require("./firebase-database");
const firebaseSignIn = require("./firebase-signin");

const databaseFunc = new firebaseDatabase();
const signInFunc = new firebaseSignIn();

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
    app.get('/firebase/user', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getCurrentUserInfo(req.params.id).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
    app.post('/firebase/api/topics', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req);
            databaseFunc.saveTopics(req.body.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(req.body);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.post('/firebase/api/questions', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req);
            databaseFunc.saveQuestions(req.body.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(req.body);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.post("/firebase/signin", (req, res) => {
        console.log(req.body);
        new Promise((resolve, reject) => {
            signInFunc.callGoogleSignIn(resolve, reject)
        }).then((data) => {
            res.json(data);
        })
            .catch((err) => {
                console.log(err)
            });
    });
    app.post("/firebase/logout", (req, res) => {
        console.log(req);
        return new Promise((resolve, reject) => {
            signInFunc.callGoogleSignIn(resolve, reject)
        }).then((data) => {
            res.json(data);
        })
            .catch((err) => {
                res.end(err)
            });
    });
};