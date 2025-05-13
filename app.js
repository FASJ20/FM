import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import authRouter from './routes/auth.js';
import membersRouter from './routes/members.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { Member } from './models/members.js';
import { comparePassword } from './helpers.js';
import { error } from 'console';
import { User } from './models/user.js';





// Environment variables
const PORT =  process.env.PORT;
const SESSION_SECRET =  process.env.SESSION_SECRET;
const MONGO_URL =  process.env.MONGO_URL;




const app = express();
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//setting EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static file
app.use(express.static("public"));




// connecting to database
mongoose.connect(MONGO_URL)
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(`Error: ${err}`)) // if there's an error

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Using sessions
app.use(
    session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(), // Tostore the sessions in the data base 
    }),
    })
);
// Using the authentication route
app.use(authRouter);

// Using the members route
app.use(membersRouter);

//  app.use( async (req, res, next) => {
//     if (req.session.id === await sessions.findOne(id._id)){
//         next()
//     } else {
//         res.render('./auth/login')
//     }
// })


// home route
app.get('/', (req, res) => {
    
    if (req.session.user ){
        res.render("./dashboard", {item: req.session.user});
    } else {
        res.render('./auth/login', { error: null})
    }
});
//To get to the signup page
app.get('/register', (req, res) => {
    res.render("./auth/signup");
});

//TO get to the login page
app.get('/login', (req, res) => {
    
     res.render("./auth/login", { error: null });
    
});

//To show all members
app.get('/members', async (req, res) => {
    let Data = await Member.find()
    res.render("./members/index.ejs", {data: Data} );
});
//To route to the add members page
app.get('/member/add', (req, res) => {
    res.render("./members/addmember.ejs");
});

//To update members
app.post('/member/update', async (req, res) => {
    let data = await Member.findOne({_id: req.body.id});
    res.render("./members/edit.ejs", { item: data });
});

// Show just one member
app.get('/member/:id', async (req, res) => {
    let data = await Member.findOne({_id: req.params.id});
    res.render('./members/show', { item: data })
});

// Error

app.get('/error', (req, res) => {
    res.render('./404.ejs')
})
//To get partials
app.get('/partials', (req, res) => {
    res.render('./partials/about.ejs')
})
app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/login')
})




// RUN APPLICATION FROM PORT 4100

app.listen(PORT, () => {
    console.log(`application is working on http://localhost:4100`);
});