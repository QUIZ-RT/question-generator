const firebaseDatabase = require("../firebase/firebase-database.users");
const firebaseSignIn = require("../firebase/firebase-signin");

const databaseFunc = new firebaseDatabase();

module.exports = (app) => {

    app.get('/api/users/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getUserById(req.params.id).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });

    app.get('/api/users', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getAdminAccessRequestedUsers().then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    });

    app.put('/api/users/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req.body);
            databaseFunc.updateUser(req.params.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(req.body);
        })
            .catch((err) => {
                console.log(err)
            });
    });


};