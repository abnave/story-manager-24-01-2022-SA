const User = require("../models/user");
const sharp = require("sharp");

async function signin(req,successData,errorData){
    try {
        const user = new User(req.body);
        const result = await user.save();
        const token = await user.generateAuthToken();
        return successData({result,token});
    } catch (error) {
       return errorData({"error":error});
    }
}

async function login(req,successData,errorData){
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        if(!user){
            return errorData({"error":"Email and password does not match"});
        }
        const token = await user.generateAuthToken();        
        return successData({user,token});
    } catch (error) {
        return errorData({"error":error});
    }
}
async function getUserDetails(req,successData,errorData){
    try {
        if(!req.user){
            throw new Error();
        }
        return successData(req.user);  
    } catch (error) {
        return errorData({"error":error});
    }
}
async function getAllUsers(req,successData,errorData){
    try {
        const allUsers = await User.find();
        return successData(allUsers);
    } catch (error) {
        return errorData({"error":error});
    }
}
async function updateUser(req,successData,errorData){
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name","email","password","age"];
        const isValidUpdation = updates.every((update)=>{
            return allowedUpdates.includes(update);
        })
        if(!isValidUpdation){
            return errorData({"Error": "Invalid Updates"})
        }
        //const user = await User.findById(req.user._id);
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        });
        await req.user.save();
        return successData(req.user);  
    } catch (error) {
        return errorData({"error":error});
    }
}
async function deleteUser(req,successData,errorData){
    try {
        await req.user.remove();
        return successData("User Deleted succesfully");
    } catch (error) {
        return errorData({"result":"Bad request"});
    }
}
async function logout(req,successData,errorData){
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        return successData("Logged out succesfully");
    } catch (error) {
        return errorData({"result":"Bad request"});
    }
}
async function logoutAllSession(req,successData,errorData){
    try {
        req.user.tokens = [];
        await req.user.save();
        return successData("Logged out from all sessions succesfully");
    } catch (error) {
        return errorData({"result":"Bad request"});
    }
}
async function uploadAvatar(req,successData,errorData){
    try {  
        const buffer = await sharp(req.file.buffer).resize({width:250 , height:250}).png().toBuffer();
        req.user.avatar = buffer; 
        await req.user.save();     
        return successData({"result":"Avatar uploaded succesfully"});

    } catch (error) {
       return errorData({"error":error});
    }
}
async function getAvatar(req,successData,errorData){
    try { 
        const user = await User.findById(req.params._id);
        if(!user || !user.avatar){
            throw new Error("Avatar not available for this User");
        }  
        // 
        return successData(user.avatar);

    } catch (error) {
       return errorData({"error":error});
    }
}
async function deleteAvatar(req,successData,errorData){
    try {  
        req.user.avatar = []; 
        await req.user.save();     
        return successData({"result":"Avatar Deleted succesfully"});

    } catch (error) {
       return errorData({"error":error});
    }
}

exports.signin = signin;
exports.login = login;
exports.getUserDetails = getUserDetails;
exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
exports.uploadAvatar = uploadAvatar;
exports.getAvatar = getAvatar;
exports.deleteAvatar = deleteAvatar;
exports.deleteUser = deleteUser;
exports.logout = logout;
exports.logoutAllSession = logoutAllSession;