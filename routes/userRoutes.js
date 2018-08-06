const firebaseDatabase = require("../firebase/firebase-database.users");
const ServerConstants = require('../firebase/server-constants');

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

    /* 
     *  This updates the user collection with the specified properties 
     */
    app.put('/api/users/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req.body);
            databaseFunc.updateUser(req.params.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(data);
            // Todo if the data data is updated now send the administrators a notification saying so 
            if (req.body.type == ServerConstants.ADMIN_ACCESS_REQUEST) {
                databaseFunc.sendNotification(ServerConstants.NOTIFICATION_ADMIN_ACCESS, req.params.id, req.body.accessResult);
            }
        }).catch((err) => {
            console.log(err)
        });
    });


};
