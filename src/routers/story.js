const express = require('express')
const Story = require("../models/story")
const auth = require("../middleware/auth")
const User = require("../models/user");
const app = new express.Router()


app.post('/stories', auth, async (req, res) => {
    const story = new Story ({
        ...req.body,
        author :req.user._id
    })
    try {
        await story.save()
        res.status(201).send(story)
    } catch (error) {
        res.status(400).send(err)
    }  
})

app.get('/stories', auth, async (req, res) => {
        
    try {
         const allStories = await Story.find();
        res.send(allStories)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/stories/me', auth, async (req, res) => {
        
    try {
        const user = await User.findById(req.user._id);
        await user.populate("stories").execPopulate();
        if(!user.stories){
            res.status("200").send("Story not found");
        }
        res.send(user.stories)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/stories/:id", auth ,async (req,res)=>{
    const _id = req.params.id;
    try {
        const story = await Story.findOne({_id, author : req.user._id});
        if(!story){
            res.status(404).send();
        }

        res.status(200).send(story);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

app.patch("/stories/:id", auth, async (req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description"];
    const isValidUpdation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidUpdation){
        return res.status(400).send({"Error": "Invalid Updates"})
    }
    try {
        const story = await Story.findOne({_id, author: req.user._id});
        if(!story){
            throw new Error();
        }
        updates.forEach((update)=>{
            story[update] = req.body[update];
        });
        await story.save();      
        res.status(200).send(story);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

app.patch("/stories/:id/comment", auth, async (req,res)=>{
    console.log(typeof(req.body));
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["comment"];
    const isValidUpdation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidUpdation){
        return res.status(400).send({"Error": "Invalid Updates"})
    }
    try {
        const story = await Story.findById(_id);
        if(!story){
            throw new Error();
        }
        console.log(req.body);
        //story.comments = story.comments.concat({});
        //await story.save();      
        res.status(200).send(story);
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

app.delete("/stories/:id", auth, async (req,res)=>{
    const _id = req.params.id;
    try {
        const result = await Story.findOneAndDelete({_id, author: req.user._id});
        if(!result){
            res.status(200).send({"result":"story not present"});
        }
        res.status(200).send({"result":"Story deleted"});
    } catch (error) {
        res.status(500).send(error);
    }
    //res.send("Hi there");
});

module.exports = app