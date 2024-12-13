const userModel = require("../modeles/user.model");
const userService = require("../services/user.service");
const{ validationResult } = require("express-validator");   //for validation of data
const blackListTokenModel = require("../modeles/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {  // register user
    
    const errors = validationResult(req);  //check validation
    if (!errors.isEmpty()) {     
        return res.status(400).json({ errors: errors.array() });
    } 

 const { fullname, email, password } = req.body;    //take data from body

const hashedPassword =await userModel.hashPassword(password);  

const user= await userService.createUser({    //send data to service
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
});

const token = user.generateAuthToken();  //generate token

res.status(201).json({ token , user});  //send response
}

module.exports.loginUser = async (req, res, next) => {  //login user
    
    const errors = validationResult(req);  //check validation
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;    //take data from body

    const user = await userModel.findOne({ email }).select('+password');  //find user by email meaning +password will show password

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);  //compare password

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();  //generate token

    res.cookie('token', token);  //set cookie

    res.status(200).json({ token, user });
    }

module.exports.getUserProfile = async(req, res, next) => {    //get user profile

    res.status(200).json(req.user);  //send response
}

module.exports.logoutUser = async (req, res, next) => {   //logout user

    res.clearCookie('token');   //clear cookie

    res.status(200).json({ message: 'Logout successful' });  //send response

}