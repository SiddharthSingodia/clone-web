const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({  //create schema for captain model or driver model
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketid: {
        type: String,
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive"],
    },
    vehicle: {
            color:{
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
            plate:{
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"],
        },
            capacity:{
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1 person"],
        },
        vechicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "auto"],
        }
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
});

// Method to compare password
captainSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        if (!candidatePassword) {
            throw new Error("Password is required");
        }
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error("Error comparing passwords: " + error.message);
    }
};

// Method to generate auth token
captainSchema.methods.generateAuthToken = function() {
    try {
        return jwt.sign(
            { 
                _id: this._id,
                email: this.email,
                role: 'captain'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    } catch (error) {
        throw new Error("Error generating token: " + error.message);
    }
};

// Static method to hash password
captainSchema.statics.hashPassword = async function(password) {
    try {
        if (!password) {
            throw new Error("Password is required");
        }
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};

const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;