import PostController from '../controllers/PostController';
import * as express from 'express';

const controller = new PostController;

export default function postRoutes(app: express.Application) {
    app.route('/posts')
    .get(isLoggedIn, controller.getPosts)
    .post(controller.saveBook);

    app.route('/posts/:id')
    .delete(controller.deletePost);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}