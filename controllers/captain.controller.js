const captainModel = require("../modeles/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../modeles/blacklistToken.model");

module.exports.createCaptain = async (req, res, next) => {
    const errors = validationResult(req);  //check validation
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;    //take data from body

    const isCaptainAlreadyExists = await captainModel.findOne({ email });  //check if captain already exists
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);  //hash password

    const captain = await captainService.createCaptain({    //send data to service
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vechicleType: vehicle.vechicleType
    });
    const token = captain.generateAuthToken();  //generate token
    console.log(token);
     
    res.status(201).json({ token, captain });  //send response
}

module.exports.loginCaptain = async (req, res, next) => {  //login user
    const error = validationResult(req);  //check validation
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;    //take data from body
    const captain = await captainModel.findOne({ email }).select('+password');  //find captain by email meaning +password will show password
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();  //generate token
    res.cookie('token', token);  //set cookie
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {  //login user
    res.status(200).json({captain: req.captain});  //send response
}

module.exports.logoutCaptain = async (req, res, next) => {  //logout user
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];  //get token
    await blackListTokenModel.create({ token });  //add token to blacklist
    res.clearCookie('token');   //clear cookie
    res.status(200).json({ message: "Logout successful" });  //send response
}