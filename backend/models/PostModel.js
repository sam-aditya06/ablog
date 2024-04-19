import {model, Schema} from "mongoose";
import { userSchema } from "./UserModel.js";


const postSchema = new Schema({
    title: {type: String, required: true},
    author: userSchema.omit(['password']),
    categories: [String],
    summary: {type: String, required: true},
    content: {type: String, required: true},
    image: String
}, {
    timestamps: true
});

const PostModel = new model('Post', postSchema);

export default PostModel;