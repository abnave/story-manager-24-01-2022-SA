const express = new require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");



router.post("/user",async (req,res)=>{
    const user = new User(req.body);
    try {
        const result = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({result,token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/users/login",async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        if(!user){
            
        }
        const token = await user.generateAuthToken();
        
        res.status(201).send({user,token});
    } catch (error) {
        res.status(400).send("Unable to log in");
    }
})

router.get("/users/me",auth,async (req,res)=>{

    try {
        if(!req.user){
            throw new Error();
        }
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

router.get("/users",auth,async (req,res)=>{

    try {
        const result = await User.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});



router.patch("/users/me",auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name","email","password","age"];
    const isValidUpdation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidUpdation){
        return res.status(400).send({"Error": "Invalid Updates"})
    }
    try {
        //const user = await User.findById(req.user._id);
        updates.forEach((update)=>{
            req.user[update] = req.body[update];
        });
        await req.user.save();
       // const user = await User.findByIdAndUpdate(_id,req.body,{new:true , runValidators:true});
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/users/me", auth, async (req,res)=>{
    try {
        // const result = await User.findByIdAndDelete(req.user._id);
        // if(!result){
        //     res.status(200).send({"result":"User not present"});
        // }
        // res.status(200).send({"result":"User deleted"});
        await req.user.remove();
        res.status(200).send("User Deleted succesfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/users/logout",auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send("Logged out succesfully");
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post("/users/logoutAll",auth,async (req,res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("Logged out from all sessions succesfully");
    } catch (error) {
        res.status(500).send(error)
    }
});




module.exports = router;