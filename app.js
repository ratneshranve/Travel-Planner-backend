import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './router/user.router.js';
import geminiRouter from './router/gemini.router.js';
import contactRouter from './router/contact.router.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/gemini", geminiRouter);
app.use("/contact", contactRouter);

// ⬇️ Add this to start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
