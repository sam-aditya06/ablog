import {model, Schema} from "mongoose";


export const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: String
});

const User = new model('User', userSchema);

export default User;