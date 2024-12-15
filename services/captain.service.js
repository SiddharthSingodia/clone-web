const captainModel = require("../modeles/captain.model");

module.exports.createCaptain = async({    //the use of this fun is to create new captain and check if all fields are filled
    firstname, lastname, email, password, color, plate, capacity, vechicleType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vechicleType){
        throw new Error("All fields are required");
    }
    const captain = captainModel.create({  //create new captain
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vechicleType
        }
    })  
    return captain
};