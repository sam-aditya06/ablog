import fs from 'fs';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import connectDB from '../config/connectDB.js';
import createToken from '../utils/createToken.js';

export const createUser = async (req, res) => {
    const {originalname, path} = req.file;
    const newFileName  = path + '.' + originalname.split('.')[1];
    fs.renameSync(path, newFileName);

    const {name, email, password, image} = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({name, email, password: hashedPassword, image: newFileName});
    try{
        await connectDB();
        await newUser.save();
        createToken(res, newUser);
        res.status(200).json({_id: newUser._id, name, image: newFileName});
    }catch(e){
        console.log(e);
        res.status(401).json({msg: 'Registration failed'});
    }
}

export const authenticateUser = async (req, res) => {
    const {token} = req.cookies;

    if(token){
        try {
            const userDetails = jwt.verify(token, process.env.JWT_SECRET);
            res.json(userDetails);
            
        } catch (error) {
            res.json({errMsg: 'invalid token'})
        }
    }
    else
        res.send(null);
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        await connectDB();
        const userDoc = await User.findOne({email});
        if(userDoc){
            let matchPassword = await bcryptjs.compare(password, userDoc.password);
            if(matchPassword){
                createToken(res, userDoc);
                const {_id, name, image} = userDoc;
                res.json({_id, name, image});
            }
            else
                res.status(401).send('invalid email or password');
        }
        else
            res.status(401).send('No user with that email');
    } catch (error) {
        console.log(error);
    }
}

export const logoutUser = async (req, res) => {
    res.cookie('token', '').json({msg: 'User successfully logged out'});
}