import { Router } from "express";
import { User } from "../models/user.js";
import { comparePassword, hashPassword } from "../helpers.js";





const router = Router();






// To register the user and store in the database
router.post("/register",  async (req, res) => {
    const { body } = req;
    
    body.password = hashPassword(body.password); // To hash the password and store on the database after the user inputs it
   
    try {
        // To collect the user data
        new User({
            username: body.username,
            age: body.age,
            password: body.password,
            email: body.email,
            datecreated: new Date().getTime(),
        }).save().then(user => {
            
            console.log('User created successfully:', user.toJSON());
            return res.redirect('/login') // Returns the user in a Json format
          }).catch(err => {
            console.error('Error creating user:', err);
          });
    } catch (err) {
        console.log(err);
        return res.sendStatus(400) // Returns an error, if there's an error
    }
});

// For alread registered users to login
router.post("/login", async (req, res) => {
    console.log(req.body);
    const { body: {email, password} } = req;
    // const user = new User();
    try{
        // To find user from the user database
        const findUser = await User.findOne({email});
        if (!findUser) throw new Error("User not found");
        
        // Importing the compare password variable to see if the user password matches with the hashed password in the database
        if (!comparePassword(password, findUser.password)) {
            return res.render('./auth/login', { error: "Wrong credentials. Please try again"})
        }
        
            
        req.session.user = findUser;
        console.log(req.session);
        return res.redirect('/')

        
    
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message || "Login failed" });
    }
});

//Just to get the login status, nothing much
router.get('/api/users/login/status', (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session);
    });
    // To create session
    return req.session.email
    ? res.status(200).send(req.session.email)
    : res.status(401).send({ msg: "not Authenticated"});
});




export default router