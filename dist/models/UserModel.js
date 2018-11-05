"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Schema = mongoose.Schema;
var table = 'users';
var userSchema = new Schema({
    fullName: {
        type: String,
        required: 'Enter fullname',
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
exports.UserModel = mongoose.model(table, userSchema);
//# sourceMappingURL=UserModel.js.map