import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { jwtSecrete, sessionEx } from '../app.js';

export const maxAge = 3 * 24 * 60 * 60;
export const createToken = (id) => {
    return jwt.sign({ id }, `${jwtSecrete}`, {
        expiresIn: maxAge
    });
}

export const checkToken = (req, res, next) => {
    const token = req.cookies.jwt;
    //check if token exist & is verified
    if (token) {
        jwt.verify(token, `${jwtSecrete}`, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(500).json({ error: err.message || "not valid"})
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.json({error: "Login first"})
    }
    
}