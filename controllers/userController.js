const userServices = require("../services/userServices");


function signin(req,res){
    try {
        userServices.signin(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
        
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function login(req,res){
    try {
        userServices.login(req,(successData)=>{
            res.status(201).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function getUserDetails(req,res){
    try {
        userServices.getUserDetails(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function getAllUsers(req,res){
    try {
        userServices.getAllUsers(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function updateUser(req,res){
    try {
        userServices.updateUser(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function deleteUser(req,res){
    try {
        userServices.deleteUser(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function logout(req,res){
    try {
        userServices.logout(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function logoutAllSession(req,res){
    try {
        userServices.logoutAllSession(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function uploadAvatar(req,res){
    try {
        userServices.uploadAvatar(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function getAvatar(req,res){
    try {
        userServices.getAvatar(req,(successData)=>{
            res.set("Content-Type","image/png"); 
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}
function deleteAvatar(req,res){
    try {
        userServices.deleteAvatar(req,(successData)=>{
            res.status(200).send(successData);
        },(errorData)=>{
            res.status(400).send(errorData);
        })
    } catch (error) {
        res.status(500).send({"result":"Bad request"});
    }
}


module.exports.signin = signin;
module.exports.login = login;
module.exports.getUserDetails = getUserDetails;
module.exports.getAllUsers = getAllUsers;
module.exports.updateUser = updateUser;
module.exports.getAvatar = getAvatar;
module.exports.uploadAvatar = uploadAvatar;
module.exports.deleteAvatar = deleteAvatar;
module.exports.deleteUser = deleteUser;
module.exports.logout = logout;
module.exports.logoutAllSession = logoutAllSession;