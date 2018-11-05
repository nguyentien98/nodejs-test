import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const table = 'posts';

const postSchema = new Schema({
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

export const PostModel = mongoose.model(table, postSchema);