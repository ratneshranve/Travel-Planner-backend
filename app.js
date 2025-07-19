import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './router/user.router.js';
import geminiRouter from './router/gemini.router.js'; // 👈 Add this
import contactRouter from './router/contact.router.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/gemini", geminiRouter); // 👈 Add this
app.use("/contact",contactRouter);

export default app;
