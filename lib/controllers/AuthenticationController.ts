import { UserModel } from "../models/UserModel";
import passport from 'passport';

export default class AuthenticationController {
    public loginForm(req, res) {
        res.render('auth/login', {
            message: req.flash('message')
        });
    }

    public async postLogin(req, res) {
        try {
            let user = await UserModel.findOne({ email : req.body.email });
            if (! user.checkPassword(req.body.password)) {
                res.redirect('back');
            }
            res.json(user);
        } catch (error) {
            
        }
    }
}