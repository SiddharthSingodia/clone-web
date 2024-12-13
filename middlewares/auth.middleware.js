 const userModel = require("../modeles/user.model");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");

 module.exports.authUser =async (req, res, next) => {   //check if user is authenticated
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  //get token

    if (!token) {    //if token is not found
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await userModel.findOne({ token: token});  //check if token is blacklisted
     if(isBlacklisted){
         return res.status(401).json({ message: "Unauthorized" });
     }


    try {   //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();

    } catch (err) {
        return res.status(401).json({message:'Unauthorized'})   //if token is invalid
    }

}