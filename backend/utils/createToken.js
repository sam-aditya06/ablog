import jwt from "jsonwebtoken";

const createToken = (res, user) => {
    const {_id, name, email, image} = user;
    const token = jwt.sign({_id, name, email, image}, process.env.JWT_SECRET, {expiresIn: '30d'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default createToken;
