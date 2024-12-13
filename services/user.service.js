const userModel= require("../modeles/user.model");

module.exports.createUser = async({    //the use of this fun is to create new user and check if all fields are filled 
    firstname, lastname, email, password
}) => {
    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }
 
    const user = userModel.create({  //create new user
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })  

    return user
};