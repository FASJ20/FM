import { Router } from "express";
import { comparePassword, hashPassword } from "../utils/hashpassword.js";
import { query, validationResult, checkSchema, matchedData } from 'express-validator';
import { createUserRegValSchema } from "../utils/Validation.js";
import { User } from "../models/users.js"
import { sessionEx } from '../app.js';
import { createToken, maxAge } from "../utils/middlewares.js";
import cookieParser from 'cookie-parser';
const router = Router();

// To register the user and store in the database
router.post("/api/auth/register", checkSchema(createUserRegValSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const { body } = req;
    body.password = hashPassword(body.password); // To hash the password and store on the database after the user inputs it

   
    try {
        // To collect the user data
        new User({
            username: body.username, //username
            age: body.age, //age
            password: body.password, //password
            email: body.email, //email
            datecreated: new Date().getTime().toISOString().split('T')[0], // automatically registers the date
        }).save().then(user => {
            
            console.log('User created successfully:', user.toJSON());
            return res.send(user.toJSON()) // Returns the user in a Json format
          }).catch(err => {
            console.error('Error creating user:', err);
          });
    } catch (err) {
        console.log(err);
        return res.sendStatus(400) // Returns an error, if there's an error
    }
});



// For alread registered users to login and to register the session in JWT
router.post("/api/auth/login", async (req, res) => {
    console.log(req.body);
    const { body: {email, password} } = req;
    // const user = new User();
    try{
        // To find user from the user database
        const findUser = await User.findOne({email});
        const token = createToken(findUser._id);
        console.log(token);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        if (!findUser) throw new Error("User not found");
        
        // Importing the compare password variable to see if the user password matches with the hashed password in the database
        if (!comparePassword(password, findUser.password)) {
            return res.status(404).send("Bad Credentials")
        }
        return res.status(201).json({findUser: findUser});
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message || "Login failed" });
    }
});



// logout endpoint
router.get('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
});



export default router