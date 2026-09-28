const express = require('express');
const connectDB = require('./config/db.config');
const authRouter = require('./routers/auth.router');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json())
app.use(cookieParser())
connectDB();

app.get('/',(req,res)=>{
    res.send('Welcome to Authentication System');
}) 

app.use('/auth', authRouter)

module.exports = app;