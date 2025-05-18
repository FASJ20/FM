import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import membersRouter from './routes/members.js';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

import 'dotenv/config';


const app = express();

//Let's us use json parsed from the body
app.use(express.json());
app.use(cookieParser());
const file  = fs.readFileSync('./swaggeropenapi.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(authRouter);
app.use(membersRouter);
//Environment Variables
const mongouri = process.env.MONGODB_URI;
export const port = process.env.port || 6300;
export const jwtSecrete = process.env.JWT_SECRETE;
export const sessionEx = process.env.JWT_EXPIRES_IN;

mongoose.connect(mongouri)
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(`Error: ${err}`)) // if there's an error

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
});