import AuthenticationController from '../controllers/AuthenticationController';
import * as express from 'express';
import * as passport from 'passport';

const controller = new AuthenticationController;

export default function authenticationRoutes(app: express.Application) {
    app.route('/login')
    .get(controller.loginForm)
    .post((req, res) => {
        passport.authenticate('local', 
            {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: 'Incorect email or password'
            }
        )
    });
}