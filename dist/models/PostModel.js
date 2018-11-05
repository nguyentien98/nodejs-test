"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var table = 'posts';
var postSchema = new Schema({
    title: {
        type: String,
        required: 'Enter title'
    },
    detail: {
        type: String,
        required: 'Enter detail'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});
exports.PostModel = mongoose.model(table, postSchema);
//# sourceMappingURL=PostModel.js.map