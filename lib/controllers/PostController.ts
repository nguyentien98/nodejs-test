import {PostModel} from '../models/PostModel';
import {UserModel} from '../models/UserModel';

export default class PostController {
    saveBook(req, res) {
        let post = new PostModel(req.body);
        try {
            post.save(async (error, data) => {
                await UserModel.updateOne({ _id: req.body.user}, {$push: {posts: data}});
                res.json(data);
            });
        } catch (error) {
            res.json(error);
        }
    }

    getPosts(req, res) {
        PostModel.find().populate('user').exec((error, data) => {
            res.render('posts/list', {
                posts: data
            });
        });
    }

    deletePost(req, res) {
        try {
            PostModel.find({ _id: req.params.id }, async (error, post) => {
                if (post !== null) {
                    await PostModel.deleteOne({_id: req.params.id});
                }
                res.redirect('back');
            });
        } catch (error) {
            
        }
    }
}