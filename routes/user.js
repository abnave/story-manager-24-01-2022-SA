const express = new require("express");
const multer = require("multer");
const checkAuth = require("../middleware/auth");
const userController = require("../controllers/userController");
const router = new express.Router();
const upload = multer({
    limits :{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error("Only Image files allowed"));
        }
        cb(undefined,true)
    }
});

router.post("/users/signin",userController.signin);
router.get("/users/login",userController.login);
router.get("/users/me",checkAuth,userController.getUserDetails);
router.get("/users",checkAuth,userController.getAllUsers);
router.patch("/users/me",checkAuth,userController.updateUser);
router.post("/users/me/avatar",checkAuth,upload.single("upload"),userController.uploadAvatar,(error,req,res,next)=>{
    res.status(400).send(error.message)
});
router.get("/users/:_id/avatar",userController.getAvatar);
router.delete("/users/me/avatar",checkAuth,userController.deleteAvatar);
router.delete("/users/me",checkAuth,userController.deleteUser);
router.post("/users/logout",checkAuth,userController.logout);
router.post("/users/logoutAll",checkAuth,userController.logoutAllSession);

module.exports = router;