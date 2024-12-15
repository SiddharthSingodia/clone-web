const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectTodb = require("./db/db");
const userRouter = require("./routes/user.routes"); //import user router
const cookieParser = require("cookie-parser");
const captainRouters = require("./routes/captain.routes");

connectTodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/captain', captainRouters);  // Add captain routes
app.use('/api/user', userRouter);  // Add user routes

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.use('/users', userRouter); 

module.exports = app;