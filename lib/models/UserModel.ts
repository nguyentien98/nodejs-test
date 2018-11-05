import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from "bcrypt-nodejs";

const Schema = mongoose.Schema;
const table = 'users';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: 'Enter fullname',
    },
    password: {
        type: String,
        required: 'Enter password'
    },
    email: {
        type: String,
        required: 'Enter email',
        unique: true
    },
    phoneNumber: {
        type: String
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }]
});

userSchema.plugin(uniqueValidator);

userSchema.methods.generateHash = function (password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

export const UserModel = mongoose.model(table, userSchema);