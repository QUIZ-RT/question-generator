const firebaseDatabase = require("./firebase-database");
const firebasefunc = new firebaseDatabase();

module.exports = (app) => {
    app.get('/firebase/api/questions', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            firebasefunc.getQuestions(null).then((data) => {
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
            firebasefunc.getQuestions(req.params.id).then((data) => {
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
            firebasefunc.getTopics(null).then((data) => {
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
            firebasefunc.getTopics(req.params.id).then((data) => {
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
            firebasefunc.getCurrentUserInfo(req.params.id).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};