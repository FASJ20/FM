import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import authRouter from './routes/auth.js';
import membersRouter from './routes/members.js';
import usersRouter from './routes/users.js'
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';







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


// Using sessions
app.use(
    session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
    // store: MongoStore.create({
    //     client: mongoose.connection.getClient(), // Tostore the sessions in the data base 
    // }),
    })
);
// Using the authentication route
app.use(authRouter);

// Using the members route
app.use(membersRouter);

//Using the users route
app.use(usersRouter)

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
        req.session.user = null;
        res.render('./auth/login', { error: null})
    }
});

// Error

app.get('/error', (req, res) => {
    res.render('./404.ejs')
});

//To get partials
app.get('/partials', (req, res) => {
    res.render('./partials/about.ejs')
});

// RUN APPLICATION FROM PORT 

app.listen(PORT, () => {
    console.log(`application is working on http://localhost:4100`);
});










