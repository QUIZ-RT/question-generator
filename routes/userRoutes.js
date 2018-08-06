/**
 * Author: mahendra
 */
const firebaseDatabase = require("../firebase/firebase-database.users");
const ServerConstants = require('../firebase/server-constants');

const databaseFunc = new firebaseDatabase();

let userController = ({ app, jsonWebToken, middleware }) => {

    callback = (result, err, res) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.send(result);
        }
    }

    checkAccessRight = (req, res) => {
        if (!(req.token.isAdmin == true)) {
            res.status(401);
            res.send({message: "You are not authorized for this operation. You can request admin access at QuizGenx Portal."});
        }  
    }

    getUserById =  (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            databaseFunc.getUserById(req.params.id).then((data) => {
                res.json(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    getAllUsers = (req, res) => {  
        checkAccessRight(req, res);
        databaseFunc.getAllUsers().then((data) => {            
            res.json(data);
        }).catch((err) => {
            callback(null, err, res);
        });
    };

    getAdminAccessRequestedUsers = (req, res) => {
        checkAccessRight(req, res);
        databaseFunc.getAdminAccessRequestedUsers().then((data) => {
            let retResult = [];
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    let userItem = data[property];
                    if(!userItem.hasOwnProperty("email"))
                    continue
                    if(userItem.isAdmin  
                        || (!userItem.isAdmin && userItem.adminAccessRequested)){
                        retResult.push(userItem);
                    }
                }
            } 
            res.json(retResult);
        }).catch((err) => {
            callback(null, err, res);
        });
    };

    getToken = app.post('/api/token', (req, res) => { // it will register the user for tokens
        req.body.userId = req.body.userId.trim();
        req.body.email = req.body.email.trim();
        let params = [req.body.userId, req.body.email];
        console.log(params);
        databaseFunc.getUserById(req.body.userId).then((data) => {
            if (data && data.email == req.body.email) {
                let payload = req.body;
                payload.displayName =data.displayName;
                payload.isAdmin =data.isAdmin;
                let accessToken = jsonWebToken.sign(payload, app.get('jwtSecret'), {
                    expiresIn: 3600 * 24 * 365
                });
                res.json({
                    authsuccess: true,
                    accessToken: accessToken,
                    userId: data.userId,
                    isAdmin: data.isAdmin,
                    displayName: data.displayName
                });
            } else {
                res.json({
                    'status': "false",
                    "message": "User is not registered."
                })
            }

        }).catch((err) => {
            res.json({
                'status': "false",
                "message": "Some Internal error has occurred. Contact QuizGenx team."
            })
        });

    });


    /* 
     *  This updates the user collection with the specified properties 
     */
    updateUserInfo = app.put('/api/users/:id', (req, res) => { // it will current user detail on screan
        return new Promise((resolve, reject) => {
            console.log(req.body);
            databaseFunc.updateUser(req.params.id, req.body, resolve, reject)
        }).then((data) => {
            res.json(data);
            // Todo if the data data is updated now send the administrators a notification saying so 
            if (req.body.type == ServerConstants.ADMIN_ACCESS_REQUEST) {
                databaseFunc.sendNotification(ServerConstants.NOTIFICATION_ADMIN_ACCESS, 
                    req.params.id, 
                    req.body.displayName);
            }
        }).catch((err) => {
            console.log(err)
        });
    });

    return {
        getAllUsers,
        getUserById,
        getAdminAccessRequestedUsers
    }
};

module.exports = userController;
