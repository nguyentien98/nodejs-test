import {UserController} from '../controllers/UserController';
import * as express from 'express';

const controller = new UserController();

export default function userRoutes(app: express.Application) {
    app.route('/users')
        .get(controller.getAll)
        .post(controller.addNewUser);

    app.route('/users/add')
        .get(controller.addUserView);

    app.route('/users/:id')
        .get(controller.findOne)
        .put(controller.updateUser)
        .delete(controller.deleteUser);
}
