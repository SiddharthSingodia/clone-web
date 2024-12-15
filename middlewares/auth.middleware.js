 const userModel = require("../modeles/user.model");
const captainModel = require("../modeles/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../modeles/blacklistToken.model");


module.exports.authUser =async (req, res, next) => {   //check if user is authenticated
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  //get token
     console.log(token);


    if (!token) {    //if token is not found
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token});  //check if token is blacklisted
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

module.exports.authCaptain = async (req, res, next) => {   //check if captain is authenticated
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  //get token
    console.log(token);

    if (!token) {    //if token is not found
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token});  //check if token is blacklisted
     if(isBlacklisted){
         return res.status(401).json({ message: "Unauthorized" });
     }

    try {   //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.captain = captain;
        next();
    } catch (err) {
        return res.status(401).json({message:'Unauthorized'})
    }
}
