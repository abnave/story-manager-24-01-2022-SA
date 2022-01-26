const express = new require("express");
const router = new express.Router();
const checkAuth = require("../middleware/auth");
const userController = require("../controllers/userController");


router.post("/users/signin",userController.signin);
router.get("/users/login",userController.login);
router.get("/users/me",checkAuth,userController.getUserDetails);
router.get("/users",checkAuth,userController.getAllUsers);
router.patch("/users/me",checkAuth,userController.updateUser);
router.delete("/users/me",checkAuth,userController.deleteUser);
router.post("/users/logout",checkAuth,userController.logout);
router.post("/users/logoutAll",checkAuth,userController.logoutAllSession);

module.exports = router;