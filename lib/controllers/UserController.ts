import {Request, Response} from 'express';
import * as mongoose from 'mongoose';
import {UserModel} from '../models/UserModel';
import mongooseId from "../helpers/mongooseId";

export class UserController {

    public getAll(req, res) {
        try {
            UserModel.find((error, users) => {
                res.render('users/list', {
                    users
                });
            });
        } catch(error) {
            console.log(error);
        }
    }

    public addUserView(req, res) {
        res.render('users/add', {
            message: req.flash('message')
        });
    }

    public async addNewUser(req, res) {
        try {
            let user = new UserModel(req.body);
            if (req.body.password) {
                user.password = user.generateHash(user.password);
                let savedUser = await user.save();
            }
            res.redirect('users');
        } catch(error) {
            req.flash('message', 'Please enter all of inputs');
            res.redirect('back');
        }
    }

    public deleteUser(req, res) {
        try{
            let id = req.params.id;
            if (! mongooseId(id)) {
                throw {message: 'User not found'};
            }
            UserModel.findOne({ _id: id }, function (error, user) {
                if (error) throw error;
                if (user !== null) {
                    UserModel.deleteOne({ _id: id }, (error, user) => {
                        res.redirect('back')
                    });
                } else {
                    res.json({ message: 'User not found.' });
                }
            })
        } catch(error) {
            res.json(error);
        }
    }

    public findOne(req, res) {
        try {
            let id = req.params.id;
            if (! mongooseId(id)) {
                throw {message: 'User not found'};
            }
            UserModel.findOne({ _id: id })
            .populate('posts')
            .exec((error, user) => {
                if (error) res.json(error);
                if (user !== null) {
                    res.json(user);
                } else {
                    res.json({ message: 'User not found.' });
                }
            });
        } catch (error) {
            res.json(error);
        }
    }

    public updateUser(req, res) {
        try {
            let id = req.params.id;
            if (! mongooseId(id)) {
                throw {message: 'User not found'};
            }
            UserModel.findOne({_id: id}, function (error, data) {
                if (error) throw error;
                if (data !== null) {
                    UserModel.updateOne({_id: id}, {$set: req.body}, function (error, data) {
                        if (error) throw error;
                        res.json(data);
                    });
                } else {
                    res.json({message: 'User not found'});
                }
            });
        } catch (error) {
            res.json(error);
        }
    }
}