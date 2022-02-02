const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../models/user");


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id : userOneId,
    name : 'Test User',
    email : 'testuser@test.com',
    password : 'testuser@123',
    age : 25,
    tokens : [{ 
        token : jwt.sign({_id : userOneId},process.env.API_SECRET)
    }]
}

const setupDatabase = async ()=>{
    await User.deleteMany();
    const user = new User(userOne);
    await user.save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}