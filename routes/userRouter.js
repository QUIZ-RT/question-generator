/**
 * Author: mahendra
 */
let router = (packages) => {
    let userRouter = packages.express.Router();

    userRouter.use(packages.middleware);

    let userRoutes = require('./userRoutes')(packages);

    userRouter.route('/api/users')
        .get(userRoutes.getAllUsers);

    userRouter.route('/api/admin/users')
        .get(userRoutes.getAdminAccessRequestedUsers);

    userRouter.route('/api/users/:id')
        .get(userRoutes.getUserById);
    return userRouter;
};

module.exports = router;